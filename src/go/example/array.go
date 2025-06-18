//go:build array

package main

import "fmt"

func main() {
	var a [5]int // array
	fmt.Println("a", a)

	a[3] = 7
	fmt.Println("a", a)

	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("b", b)

	c := [...]int{1, 2, 3, 4, 5}
	fmt.Printf("typeof c: %T\n", c)

	d := [...]int{1, 3: 4, 5, 6: 7}
	fmt.Println("d", d) // [1 0 0 4 5 0 7]

	var twoD [2][3]int
	for i := range 2 {
		for j := range 3 {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("twoD", twoD)

	twoD = [...][3]int{
		{1, 2, 3},
		{1, 2, 3},
	}
	fmt.Println("new twoD", twoD)
}
