//go:build recover

package main

import "fmt"

// panic 等价于 throw
// defer 等价于 finally
// recover 等价于 catch

func doPanic() {
  panic("A problem")
}

func main() {
  defer func() {
    if err := recover(); err != nil {
      fmt.Println("Recovered, err:", err)
    }
  }()

  doPanic()

  fmt.Println("After doPanic()") // 不执行
}
