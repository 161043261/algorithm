//go:build channelDirection

package main

import "fmt"

// chan<-   Send only      只允许向通道发送值
// <-chan   Receive only   只允许从通道接收值
func ping(pingChan chan<- string /* send only */, msg string) {
	pingChan <- msg
}

func pong(pingChan <-chan string /* receive only */, pongChan chan<- string /* send only */) {
	// msg := <-pingChan
	// pongChan <- msg
	pongChan <- <-pingChan
}

func main() {
	pingChan := make(chan string, 1)
	pongChan := make(chan string, 1)

	ping(pingChan, "1472")
	pong(pingChan, pongChan)
	fmt.Println(<-pongChan) // 1472
}
