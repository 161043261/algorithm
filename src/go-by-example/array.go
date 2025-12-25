//go:build array

package main

import "fmt"

func main() {

	var a [5]int
	fmt.Println("empty", a)

	a[4] = 100
	fmt.Println("set", a)
	fmt.Println("get", a[4])

	fmt.Println("length", len(a))

	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("declare", b)

	b = [...]int{1, 2, 3, 4, 5}
	fmt.Println("declare", b)

	b = [...]int{1, 3: 4, 5}
	fmt.Println("index", b)

	var twoD [2][3]int
	for i := range 2 {
		for j := range 3 {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2 dimensions", twoD)

	twoD = [2][3]int{
		{1, 2, 3},
		{1, 2, 3},
	}
	fmt.Println("2 dimensions", twoD)
}
