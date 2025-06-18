//go:build environmentVariable

package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	os.Setenv("CC", "gcc")
	fmt.Println("CC:", os.Getenv("CC"))
	fmt.Println("CXX:", os.Getenv("CXX"))

	for _, env := range os.Environ() {
		kv := strings.SplitN(env, "=", 2)
		fmt.Println(kv[0], kv[1])
	}
}
