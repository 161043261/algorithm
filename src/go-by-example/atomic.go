//go:build atomic

package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {

	var atomicInt atomic.Int32

	var wg sync.WaitGroup

	// wg.Add(50)

	for range 50 {
		// go func () {
		//   defer wg.Done()
		//   for range 1000 {
		//     atomicInt.Add(1)
		//   }
		// }()

		wg.Go(func() {
			for range 1000 {
				atomicInt.Add(1)
			}
		})
	}

	wg.Wait()

	fmt.Println("atomicInt", atomicInt.Load())
}
