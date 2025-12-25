//go:build chan_sync

package main

import (
	"fmt"
	"time"
)

func worker(doneChan chan bool) {
	fmt.Println("working")
	time.Sleep(3 * time.Second)
	fmt.Println("done")
	doneChan <- true
}

func main() {
	doneChan := make(chan bool)
	go worker(doneChan)
	<-doneChan
}
