package algo

import (
	"sync"
	"time"
)

var DefaultLocalCacheMaxLen = 1000
var DefaultLocalCacheExpireTimeout = 24 * time.Hour

var AvocadoFunctionOwnerCache *LocalCache[string]

func init() {
	AvocadoFunctionOwnerCache = NewLocalCache[string](DefaultLocalCacheMaxLen)
}

type LocalCache[K comparable] struct {
	maxLen   int
	head     *CacheNode[K]
	len      int
	key2node map[K]*CacheNode[K]
	lock     *sync.Mutex
}

type CacheNode[K comparable] struct {
	key            K
	value          any
	next           *CacheNode[K]
	prev           *CacheNode[K]
	expireDeadline time.Time
}

func NewLocalCache[K comparable](maxLen int) *LocalCache[K] {
	if maxLen <= 0 {
		panic("maxLen should > 0")
	}
	head := CacheNode[K]{}
	head.next = &head
	head.prev = &head

	return &LocalCache[K]{
		maxLen:   maxLen,
		head:     &head,
		len:      0,
		key2node: make(map[K]*CacheNode[K]),
		lock:     &sync.Mutex{},
	}
}

func (c *LocalCache[K]) Len() int {
	c.lock.Lock()
	defer c.lock.Unlock()

	return c.len
}

func (c *LocalCache[K]) Delete(key K) {
	c.lock.Lock()
	defer c.lock.Unlock()

	if node, ok := c.key2node[key]; ok {
		c.deleteNode(node)
	}
}

func (c *LocalCache[K]) getNode(key K) (node *CacheNode[K], ok bool) {
	node, ok = c.key2node[key]
	if !ok {
		return
	}

	if node.expireDeadline.Before(time.Now()) {
		c.deleteNode(node)
		return nil, false
	}

	// Refresh...
	node.expireDeadline = time.Now().Add(DefaultLocalCacheExpireTimeout)

	return node, true
}

func (c *LocalCache[K]) Get(key K) (value any, ok bool) {
	c.lock.Lock()
	defer c.lock.Unlock()
	node, ok := c.getNode(key)
	if !ok {
		return
	}

	return node.value, true
}

func (c *LocalCache[K]) deleteNode(node *CacheNode[K]) {
	c.unlinkNode(node)
	delete(c.key2node, node.key)
	c.len--
}

func (c *LocalCache[K]) deleteEnd() {
	p := c.head.prev
	if p == c.head || p == nil {
		return
	}
	c.deleteNode(p)
}

func (c *LocalCache[K]) unlinkNode(node *CacheNode[K]) {
	p, n := node.prev, node.next
	p.next, n.prev = n, p
}

func (c *LocalCache[K]) headInsert(node *CacheNode[K]) {
	n := c.head.next
	c.head.next = node
	node.prev, node.next = c.head, n
	n.prev = node
}

func (c *LocalCache[K]) AddWithDeadline(key K, value any, expireDeadline time.Time) {
	c.lock.Lock()
	defer c.lock.Unlock()

	// Check if the key is already in the cache
	if node, ok := c.key2node[key]; ok {
		node.value = value
		node.expireDeadline = expireDeadline
		c.unlinkNode(node)
		c.headInsert(node)
		return
	}

	node := &CacheNode[K]{
		key:            key,
		value:          value,
		expireDeadline: expireDeadline,
	}
	c.key2node[key] = node
	c.headInsert(node)
	c.len++
	if c.len > c.maxLen {
		c.deleteEnd()
	}
}

func (c *LocalCache[K]) AddWithTimeout(key K, value any, timeout time.Duration) {
	// c.lock.Lock()
	// defer c.lock.Unlock()

	expireDeadline := time.Now().Add(timeout)
	c.AddWithDeadline(key, value, expireDeadline)
}

func (c *LocalCache[K]) Add(key K, value any) {
	// c.lock.Lock()
	// defer c.lock.Unlock()

	expireDeadline := time.Now().Add(DefaultLocalCacheExpireTimeout)
	c.AddWithDeadline(key, value, expireDeadline)
}
