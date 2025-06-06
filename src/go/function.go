//go:build function

package main

import "fmt"

func plus(a int, b int) int {
	return a + b
}

func plus2(a, b, c int) int {
	return a + b + c
}

func main() {
	res := plus(1, 2)
	fmt.Println("1+2 =", res)
	res = plus2(1, 2, 3)
	fmt.Println("1+2+3 =", res)
}
