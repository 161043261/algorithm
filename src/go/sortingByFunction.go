//go:build sortingByFunction

package main

import (
	"cmp"
	"fmt"
	"slices"
)

func main() {
	strSlice := []string{"aaa", "b", "cc"}
	lenCmp := func(a, b string) int {
		return cmp.Compare(len(a), len(b))
	}

	slices.SortFunc(strSlice, lenCmp)
	fmt.Println(strSlice) // [b cc aaa]

	type People struct {
		name string
		age  int
	}

	people := []People{
		/* People */ {name: "aaa", age: 22},
		/* People */ {name: "b", age: 23},
		/* People */ {name: "cc", age: 24},
	}

	slices.SortFunc(people, func(a, b People) int {
		return cmp.Compare(a.age, b.age)
	})
  fmt.Println(people) // [{aaa 22} {b 23} {cc 24}]
}
