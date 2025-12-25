//go:build chan_operation

package main

import "fmt"

func main() {
	messageChan := make(chan string)
	signalChan := make(chan bool)

	select {
	case msg := <-messageChan:
		fmt.Println("received message", msg)
	default:
		fmt.Println("no message received") // printed
	}

	msg := "hello"
	select {
	case messageChan <- msg:
		fmt.Println("sent message", msg)
	default:
		fmt.Println("no message sent") // printed
	}

	select {
	case msg := <-messageChan:
		fmt.Println("received message", msg)
	case sig := <-signalChan:
		fmt.Println("received signal", sig)
	default:
		fmt.Println("nothing") // printed
	}
}
