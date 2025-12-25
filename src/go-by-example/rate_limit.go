//go:build rate_limit

package main

import (
	"fmt"
	"time"
)

func main() {

	requestChan := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		requestChan <- i
	}
	close(requestChan)

	var limiterChan <-chan time.Time = time.Tick(3 * time.Second)

	// Regulator: 1 req per 3s
	for req := range requestChan {
		<-limiterChan
		fmt.Println("request", req, time.Now())
	}

	fmt.Println()

	burstLimiter := make(chan time.Time, 3)

	for range 3 {
		burstLimiter <- time.Now()
	}

	go func() {
		for t := range time.Tick(3 * time.Second) {
			burstLimiter <- t
		}
	}()

	burstRequestChan := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		burstRequestChan <- i
	}
	close(burstRequestChan)
	for req := range burstRequestChan {
		<-burstLimiter
		fmt.Println("request", req, time.Now())
	}
}
