//go:build select

// select 等待多个通道
package main

import (
	"fmt"
	"time"
)

func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(1 * time.Second)
		ch1 <- "One"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		ch2 <- "Two"
	}()

  //! 每轮只 select 一个 case
	for range 2 {
		select {
		case msg1 := <-ch1:
			fmt.Println("msg1:", msg1)
		case msg2 := <-ch2:
			fmt.Println("msg2:", msg2)
		}
	}
  // msg1: One
  // msg2: Two
}
