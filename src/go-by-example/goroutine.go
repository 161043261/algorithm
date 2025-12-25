//go:build goroutine

package main

import (
	"fmt"
	"time"
)

func f(msg string) {
	for i := range 3 {
		fmt.Println(msg, fmt.Sprintf("loop %v", i))
	}
}

func main() {

	f("main")

	go f("coroutine")

	go func(msg string) {
		f(msg)
	}("goroutine")

	time.Sleep(time.Second)
	fmt.Println("done")
}
