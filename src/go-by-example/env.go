//go:build env

package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {

	fmt.Println("CC =", os.Getenv("CC"))
	fmt.Println("CXX =", os.Getenv("CXX"))
	os.Setenv("CXX", "clang++")
	fmt.Println("CXX =", os.Getenv("CXX"))

	fmt.Println()
	for _, e := range os.Environ() {
		kv := strings.SplitN(e, "=", 2)
		fmt.Println(kv[0])
	}
}
