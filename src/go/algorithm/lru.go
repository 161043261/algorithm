package algo

import (
	"container/list"
	"sync"
	"time"
)

type Cache[K comparable] interface {
	Add(key K, value any, expireDeadline time.Time)
	Get(key K) (any, bool)
	Len() int
}

type cache[K comparable] struct {
	size     int
	list     *list.List
	key2elem map[K]*list.Element
}

type node[K comparable] struct {
	key            K
	value          any
	expireDeadline time.Time
}

func NewUnlocked[K comparable](size int) Cache[K] {
	if size <= 0 {
		panic("size should > 0")
	}
	return &cache[K]{
		size:     size,
		list:     list.New(),
		key2elem: make(map[K]*list.Element),
	}
}

func (c *cache[K]) Add(key K, value any, expireDeadline time.Time) {
	if e, ok := c.key2elem[key]; ok {
		c.list.MoveToFront(e)
		v := e.Value.(*node[K])
		v.value = value
		v.expireDeadline = expireDeadline
		return
	}

	c.key2elem[key] = c.list.PushFront(&node[K]{
		key:            key,
		value:          value,
		expireDeadline: expireDeadline,
	})

	if c.list.Len() > c.size {
		node := c.list.Back()
		if node != nil {
			c.removeElem(node)
		}
	}
}

func (c *cache[K]) Get(key K) (any, bool) {
	if e, ok := c.key2elem[key]; ok {
		n := e.Value.(*node[K])

		if n.expireDeadline.After(time.Now()) {
			c.list.MoveToFront(e)
			return n.value, true
		}

		c.removeElem(e)
	}
	return nil, false
}

func (c *cache[K]) Remove(key K) {
	if n, ok := c.key2elem[key]; ok {
		c.removeElem(n)
	}
}

func (c *cache[K]) Len() int {
	return c.list.Len()
}

func (c *cache[K]) removeElem(e *list.Element) {
	c.list.Remove(e)
	n := e.Value.(*node[K])
	delete(c.key2elem, n.key)
}

type lockedCache[K comparable] struct {
	c cache[K]
	m sync.Mutex
}

func NewLocked[K comparable](size int) Cache[K] {
	if size <= 0 {
		panic("size should > 0")
	}
	return &lockedCache[K]{
		c: cache[K]{
			size:     size,
			list:     list.New(),
			key2elem: make(map[K]*list.Element),
		},
	}
}

func (l *lockedCache[K]) Add(key K, value any, expireDeadline time.Time) {
	l.m.Lock()
	defer l.m.Unlock()
	l.c.Add(key, value, expireDeadline)
}

func (l *lockedCache[K]) Get(key K) (any, bool) {
	l.m.Lock()
	defer l.m.Unlock()
	return l.c.Get(key)
}

func (l *lockedCache[K]) Remove(key K) {
	l.m.Lock()
	defer l.m.Unlock()
	l.c.Remove(key)
}

func (l *lockedCache[K]) Len() int {
	l.m.Lock()
	defer l.m.Unlock()
	return l.c.Len()
}
