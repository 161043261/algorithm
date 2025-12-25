//go:build slice

package main

import (
	"fmt"
	"slices"
)

func main() {

	var s []string
	fmt.Println("uninitialized", s, s == nil, len(s) == 0)

	s = []string{}
	fmt.Println("initialized", s, s != nil, len(s) == 0)

	s = make([]string, 3)
	fmt.Println("empty", s, "length", len(s), "capacity", cap(s))

	s = make([]string, 3, 5)
	fmt.Println("empty", s, "length", len(s), "capacity", cap(s))

	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set", s)
	fmt.Println("get", s[2])

	fmt.Println("length", len(s))

	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("append", s)

	c := make([]string, len(s))
	copy(c, s)
	fmt.Println("copy", c)

	l := s[2:5]
	fmt.Println("slice1", l)

	l = s[:5]
	fmt.Println("slice2", l)

	l = s[2:]
	fmt.Println("slice3", l)

	t := []string{"g", "h", "i"}
	fmt.Println("declare", t)

	t2 := []string{"g", "h", "i"}
	if slices.Equal(t, t2) {
		fmt.Println("t slices.Equal t2")
	}

	twoD := make([][]int, 3)
	for i := range 3 {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := range innerLen {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2 dimensions", twoD)
}
