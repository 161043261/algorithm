//go:build closure

package main

import "fmt"

// GeneratorFunction
func genFunc() /* return type */ func() int /* return type */ {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {
	// Generator
	gen := genFunc()
	fmt.Println(gen()) // 1
	fmt.Println(gen()) // 2
	fmt.Println(gen()) // 3

	gen2 := genFunc()
	fmt.Println(gen2()) // 1
}
