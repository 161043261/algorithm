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
  }
  fmt.Println(len(queue)) // 0
}
