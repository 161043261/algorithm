//go:build variable

package main

import "fmt"

func main() {
	// a := "golang"
	var a = "golang"
	// var a string = "golang"
	fmt.Println(a) // golang

	// b, c := 1, 2
	// var b, c = 1, 2
	var b, c int = 1, 2
	fmt.Println(b, c) // 1 2

	var d int
	fmt.Println(d) // 0
	var e string
	fmt.Println(e, len(e)) // <empty_string> 0
}
