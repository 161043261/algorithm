//go:build timeout

package main

import (
	"fmt"
	"time"
)

func main() {
	ch1 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		ch1 <- "res1"
	}()

	select {
	case res := <-ch1:
		fmt.Println("res:", res)
	case curTime := <-time.After(1 * time.Second):
    fmt.Println("time.Now():", time.Now())
		fmt.Println("curTime:", curTime)
	}

	ch2 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
	}()

	select {
	case res := <-ch2:
		fmt.Println("res:", res)
	case <-time.After(3 * time.Second):
		fmt.Println("timeout")
	}
}
