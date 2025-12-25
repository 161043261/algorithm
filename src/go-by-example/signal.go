//go:build signal

package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {

	signalChan := make(chan os.Signal, 1)

	signal.Notify(signalChan, syscall.SIGINT, syscall.SIGTERM)

	doneChan := make(chan bool, 1)

	go func() {

		sig := <-signalChan
		fmt.Println(sig)
		doneChan <- true
	}()

	fmt.Println("Awaiting signal")
	time.Sleep(5 * time.Second)
	<-doneChan
	fmt.Println("Gracefully exit")
}
