//go:build channelBuffering

package main

import (
	"fmt"
)

func main() {
	bufferedMsgChan := make(chan string, 2 /* bufferSize */)
  // 如果 bufferSize < 2
  // 有人发送, 无人接收 -> 死锁
	bufferedMsgChan <- "buffered"
	bufferedMsgChan <- "channel"
	fmt.Println(<-bufferedMsgChan)
	fmt.Println(<-bufferedMsgChan)
}
