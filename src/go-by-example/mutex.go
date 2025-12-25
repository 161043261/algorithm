//go:build mutex

package main

import (
	"fmt"
	"sync"
)

type container struct {
	mut      sync.Mutex
	counters map[string]int
}

func (c *container) inc(name string) {

	c.mut.Lock()
	defer c.mut.Unlock()
	c.counters[name]++
}

func main() {
	c := container{
		counters: map[string]int{"lark": 0, "hang": 0},
	}

	var wg sync.WaitGroup

	doInc := func(name string, n int) {
		for range n {
			c.inc(name)
		}
	}

	wg.Go(func() {
		doInc("lark", 10000)
	})

	wg.Go(func() {
		doInc("lark", 10000)
	})

	wg.Go(func() {
		doInc("hang", 10000)
	})

	wg.Wait()
	fmt.Println(c.counters)
}
