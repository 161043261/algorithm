//go:build ticker

package main

import (
	"fmt"
	"time"
)

// setInterval
func main() {
  ticker := time.NewTicker(500 * time.Millisecond)
  doneChan := make(chan any)

  // goroutine
  go func() {
    for {
      select {
      case <-doneChan:
        return
      case t := <-ticker.C:
        fmt.Println("Tick at", t)
      }
    }
  }()

  // 500 * 3 = 1500
  time.Sleep(1600 * time.Millisecond)
  ticker.Stop()
  doneChan <- struct{}{} // terminate goroutine
  fmt.Println("Ticker stopped")
}
