//go:build rangeOverChannel

package main

import "fmt"

func main() {
  queue := make (chan string, 2)
  queue <- "one"
  queue <- "two"
  close(queue)

  fmt.Println(len(queue)) // 2
  for elem := range queue {
    fmt.Println(elem)
    // 底层是每次循环, 从管道接收 (消费) 一个值
    // 如果管道未关闭, 则接收 (消费) 全部值后, 会死锁
  }
  fmt.Println(len(queue)) // 0
}
