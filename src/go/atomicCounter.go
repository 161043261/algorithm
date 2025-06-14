//go:build atomicCounter

package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	normInt := uint64(0)
	// var atomUint atomic.Uint64
	atomInt := atomic.Uint64{}
	// var waitGroup sync.WaitGroup
	waitGroup := sync.WaitGroup{}

	for range 50 {
		waitGroup.Add(1) // 主协程中, 等待组 +1

		go func() {
			defer waitGroup.Done()
			for range 1000 {
				atomInt.Add(1)
				normInt++
			}
		}()
	}

	waitGroup.Wait()
	fmt.Println("atomInt", atomInt.Load(), "normInt", normInt)
}
