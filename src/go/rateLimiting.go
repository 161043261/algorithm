//go:build rateLimiting

package main

import (
	"fmt"
	"time"
)

func main() {

	reqChan := make(chan int, 5)
	for i := range 5 {
		reqChan <- i
	}
	close(reqChan)

	// throttle
	limiter := time.Tick(time.Second)

	for req := range reqChan {
		<-limiter
		fmt.Println("req", req, time.Now())
	}

	burstLimiter := make(chan time.Time, 3)
	for range 3 {
		burstLimiter <- time.Now()
	}

	go func() {
		for t := range time.Tick(time.Second) {
			burstLimiter <- t
		}
	}()

	burstReqChan := make(chan int, 5)
	for i := range 5 {
		burstReqChan <- i
	}
  close(burstReqChan)

	for req := range burstReqChan {
		<-burstLimiter
		fmt.Println("req", req, time.Now())
	}
}
