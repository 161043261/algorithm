//go:build nonBlockingChannelOperation

package main

import (
	"fmt"
)

// 非阻塞通道: select + default

func main() {
	msgChan := make(chan string)
	sigChan := make(chan bool)

	select {
	case msg := <-msgChan:
		fmt.Println("Received msg:", msg) // blocked
	default:
		fmt.Println("No msg received")
	}

	msg := "ping"
	select {
	case msgChan <- msg:
		fmt.Println("Sent msg:", msg)
	default:
		fmt.Println("No msg sent")
	}

	select {
	case msg := <-msgChan:
		fmt.Println("Received msg:", msg)
	case sig := <-sigChan:
		fmt.Println("Received sig:", sig)
	default:
		fmt.Println("No activity")
	}
}
