//go:build variadicFunction

package main

import "fmt"

func sum(nums ...int) { // rest 参数
	fmt.Println(nums)
	fmt.Printf("%T\n", nums) // []int

	total := 0
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

func main() {
	sum(1, 2)
	sum(1, 2, 3)

	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
