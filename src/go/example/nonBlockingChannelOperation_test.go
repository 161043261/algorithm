package main_test

import (
	"fmt"
	"testing"
	"time"
)

func TestNonBlockingChannelOperation(t *testing.T) {
	msgChan := make(chan string)
	sigChan := make(chan bool)

	go func() {
		time.Sleep(1 * time.Second)
		msgChan <- "msg"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		sigChan <- true
	}()

	//! 只 select 一个 case
	select {
	case msg := <-msgChan:
		fmt.Println("msg:", msg)
	case sig := <-sigChan:
		fmt.Println("sig:", sig)
		// No default
	}
}

func TestNonBlockingChannelOperation2(t *testing.T) {
	msgChan := make(chan string)
	sigChan := make(chan bool)

	go func() {
		time.Sleep(1 * time.Second)
		msgChan <- "msg"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		sigChan <- true
	}()

	//! 只 select 一个 case
	select {
	case msg := <-msgChan:
		fmt.Println("Select msg:", msg)
	case sig := <-sigChan:
		fmt.Println("Select sig:", sig)
	default:
		fmt.Print("Select default")
	}
}

func TestNonBlockingChannelOperation3(t *testing.T) {
	msgChan := make(chan string, 1)
	sigChan := make(chan bool, 1)

	msgChan <- "msg"
	sigChan <- true

	select {
	case msg := <-msgChan:
		fmt.Println("Received msg:", msg) // Received msg: msg
	default:
		fmt.Println("No msg received")
	}

	msg := "ping"
	select {
	case msgChan <- msg:
		fmt.Println("Sent msg:", msg) // Sent msg: ping
	default:
		fmt.Println("No msg sent")
	}

	select {
	// Sometimes select msg...
	// Sometimes select sig...
	case msg := <-msgChan:
		fmt.Println("Received msg:", msg)
	case sig := <-sigChan:
		fmt.Println("Received sig:", sig)
	default:
		fmt.Println("No activity")
	}
}
