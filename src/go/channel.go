//go:build channel

package main

import (
	"fmt"
	"time"
)

func main() {
	msgChan := make(chan string)
	go func() {
		time.Sleep(time.Second * 3)
		msgChan <- "ping"
	}()
	msg := <-msgChan // 同步等待 3s
	fmt.Println(msg)
}
