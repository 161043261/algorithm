//go:build panic_recover

package main

import "fmt"

func doPanic() {
	panic("fatal error")
}

func main() {

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered, error\n", r)
		}
	}()

	fmt.Println("Before doPanic()")
	doPanic()
	fmt.Println("After doPanic()") // Will not run
}
