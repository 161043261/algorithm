//go:build exit

package main

import (
	"fmt"
	"os"
)

func main() {
	defer fmt.Println("Hello World")
  // 立即退出, 不会执行 defer
	os.Exit(3)
}
