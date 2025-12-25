//go:build chan

package main

import "fmt"

func main() {

	msgChan := make(chan string)

	go func() { msgChan <- "ping" }()

	msgChan2 := make(chan string, 2)

	go func() {
		msgChan2 <- "buffered"
		msgChan2 <- "channel"
	}()

	msg := <-msgChan
	fmt.Println(msg)
	fmt.Println(<-msgChan2)
	fmt.Println(<-msgChan2)
}
