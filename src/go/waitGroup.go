//go:build waitGroup

package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int) {
	fmt.Printf("Worker %d start\n", id)
	time.Sleep(time.Second)
	fmt.Printf("Worker %d end\n", id)
}

func main() {
	var waitGroup sync.WaitGroup

	for i := range 5 {
		waitGroup.Add(1) // 主协程中, 等待组 +1

		go func() {
			defer waitGroup.Done()
			worker(i)
		}()
	}

	waitGroup.Wait()
}
