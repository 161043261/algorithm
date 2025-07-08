//go:build workerPool

package main

import (
	"fmt"
	"time"
)

func worker(id int, argChan <-chan int, retChan chan<- int) {
	for arg := range argChan {
		fmt.Println("worker", id, "<- arg", arg)
		time.Sleep(time.Second)
		ret := arg * 2
		fmt.Println("worker", id, "ret <-", ret)
		retChan <- ret
	}
}

func main() {
	argChan := make(chan int, 5)
	retChan := make(chan int, 5)

	for workerId := range 3 {
		go worker(workerId, argChan, retChan)
	}

	for arg := 1; arg <= 5; arg++ {
		argChan <- arg
	}
	close(argChan)

	for range 5 {
		fmt.Println("ret", <-retChan)
	}
}
