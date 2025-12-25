//go:build function

package main

import "fmt"

// Multiple Return Values
func vals() (int, int) {
	return 3, 7
}

// Variadic Functions
// function sum(...nums: number[]) {} // TypeScript Syntax
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0

	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

func main() {
	// Multiple Return Values
	a, b := vals()
	fmt.Println(a)
	fmt.Println(b)

	_, c := vals()
	fmt.Println(c)

	// Variadic Functions
	sum(1, 2)
	sum(1, 2, 3)

	nums := []int{1, 2, 3, 4}
	// sum(...nums) // TypeScript Syntax
	sum(nums...)
}
