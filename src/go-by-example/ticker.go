//go:build ticker

package main

import (
	"fmt"
	"time"
)

func main() {

	ticker := time.NewTicker(500 * time.Millisecond)
	doneChan := make(chan bool)

	go func() {
		for {
			select {
			case <-doneChan:
				return
			case t := <-ticker.C:
				fmt.Println("Tick at", t)
			}
		}
	}()

	time.Sleep(1700 * time.Millisecond)
	ticker.Stop()
	doneChan <- true
	fmt.Println("Ticker stopped")
}
