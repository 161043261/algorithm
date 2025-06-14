//go:build sha256hash

package main

import (
	"crypto/sha256"
	"fmt"
)

func main() {
  s := "sha256 this string"
  h := sha256.New()
  h.Write([]byte(s))
  resBytes := h.Sum(nil)
  fmt.Println(s)
  fmt.Printf("%x\n", resBytes)
  fmt.Println(len(resBytes)) // 32 * 8 = 256 bits
}
