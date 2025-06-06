//go:build multipleReturnValues

package main

import "fmt"

func vals() (int, int) {
	return 3, 7
}

func main() {
	a, b := vals()
	fmt.Println(a, b)

	c, _ := vals()
	_, d := vals()
	fmt.Println(c, d)
}
