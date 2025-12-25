//go:build sort

package main

import (
	"cmp"
	"fmt"
	"slices"
)

func main() {

	strList := []string{"c", "a", "b"}
	slices.Sort(strList)
	fmt.Println("strings", strList)

	intList := []int{4, 0, 6}
	slices.Sort(intList)
	fmt.Println("integers", intList)

	yN := slices.IsSorted(intList)
	fmt.Println("sorted", yN)

	fruitList := []string{"apple", "banana", "pear"}
	lenCmp := func(a, b string) int {
		return cmp.Compare(len(a), len(b))
	}
	slices.SortFunc(fruitList, lenCmp)
	fmt.Println("fruits", fruitList)

	type user struct {
		name string
		age  int
	}

	userList := []user{
		{name: "Alice", age: 22},
		{name: "Bob", age: 21},
		{name: "Lark", age: 23},
	}
	slices.SortFunc(userList, func(a, b user) int {
		return cmp.Compare(a.age, b.age)
	})
	fmt.Println("users", userList)
}
