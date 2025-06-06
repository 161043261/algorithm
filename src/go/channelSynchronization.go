//go:build channelSynchronization

package main

import (
	"fmt"
	"time"
)

func worker(done chan any) {
	fmt.Println("Working...")
	time.Sleep(time.Second)
	fmt.Println("Done")
	done <- struct{}{}
}

func main() {
	done := make(chan any)
	go worker(done)
	<-done
}
