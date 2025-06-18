//go:build slice

package main

import "fmt"

func main() {
	var s []string
	fmt.Println(s, s == nil) // [] true
	fmt.Println("len:", len(s), "cap", cap(s))

	//! make slice
	//! make map
	//! make channel
	s = make([]string, 3)
	fmt.Println(s)
	fmt.Println("len:", len(s), "cap", cap(s))

	s[0], s[1], s[2] = "a", "b", "c"
	fmt.Println(s)
	fmt.Println("len:", len(s), "cap", cap(s))

	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println(s)
	fmt.Println("len:", len(s), "cap", cap(s))
}
