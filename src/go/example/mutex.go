//go:build mutex

package main

import (
	"fmt"
	"sync"
)

type Container struct {
	mut      sync.Mutex
	name2cnt map[string]int
}

func (ctx *Container) inc(name string) {
	ctx.mut.Lock()
	defer ctx.mut.Unlock()
	ctx.name2cnt[name]++
}

func main() {
	c := Container{
		name2cnt: map[string]int{"a": 0, "b": 0},
	}
	var waitGroup sync.WaitGroup

	doInc := func(name string, n int) {
		defer waitGroup.Done()
		for range n {
			c.inc(name)
		}
	}

	waitGroup.Add(3) // 主协程中, 等待组 +3
	go doInc("a", 10_000)
	go doInc("a", 10_000)
	go doInc("b", 10_000)

	waitGroup.Wait()
	fmt.Println("name2cnt", c.name2cnt)
}
