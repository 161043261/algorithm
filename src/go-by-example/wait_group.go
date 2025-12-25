//go:build wait_group

package main

import (
	"fmt"
	"sync"
	"time"
)

// func (wg *WaitGroup) Go(f func()) {
// 	wg.Add(1)
// 	go func() {
// 		defer wg.Done()
// 		f()
// 	}()
// }

func worker(id int) {
	fmt.Printf("Worker %d starting\n", id)

	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\n", id)
}

func main() {

	var wg sync.WaitGroup

	// wg.Add(5)

	for i := 1; i <= 5; i++ {

		// go func () {
		//   defer wg.Done()
		//   worker(i)
		// }()

		wg.Go(func() {
			worker(i)
		})
	}

	wg.Wait()
}
