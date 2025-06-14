//go:build signal

package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	sigChan := make(chan os.Signal, 1)
  // 按下 ctrl-c 时, 会将 syscall.SIGINT 信号发送到 sigChan 通道中
	signal.Notify(sigChan, syscall.SIGINT /* ctrl-c */)

	doneChan := make(chan any)
	go func() {
		sig := <-sigChan
		fmt.Println("\nSignal:", sig)
		doneChan <- struct{}{}
	}()

	fmt.Println("Waiting for signal")
	<-doneChan
	fmt.Println("Exiting")
}
