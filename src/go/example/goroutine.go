//go:build goroutine

package main

import (
	"fmt"
	"time"
)

func fn(from string) {
	for i := range 3 {
		fmt.Println(from, ":", i)
	}
}

func main() {
	fn("Main coroutine")

	go fn("1st coroutine")

	go func(msg string) {
		fmt.Println(msg)
	}("2nd coroutine")

	time.Sleep(time.Second)
	fmt.Println("Done")
}
