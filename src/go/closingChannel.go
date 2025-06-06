//go:build closingChannel

// 不能向关闭的通道发送值, 关闭的通道只能出不能进
package main

import "fmt"

func main() {
	numChan := make(chan int, 5)
	doneChan := make(chan bool)

	go func() {
		for {
			num, hasNext := <-numChan
			if hasNext {
        // Received num: 0
        // Received num: 1
        // Received num: 2
				fmt.Println("Received num:", num)
			} else {
        // Done
				fmt.Println("Done")
				doneChan <- true
				return
			}
		}
	}()

  for i := range 3 {
    numChan <- i
    // Sent num: 0
    // Sent num: 1
    // Sent num: 2
    fmt.Println("Sent num:", i)
  }

  // 关闭通道
  close(numChan)
  <-doneChan

  //! ok: hasNext && !isClosed
  val /* 返回零值 */, ok := <-numChan
  // val: 0, ok: false
  fmt.Println("val:", val, "ok:", ok)
}
