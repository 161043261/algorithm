//go:build pointer

package main

import "fmt"

func zeroVal(iVal int) {
	iVal = 0
}

func zeroPtr(iPtr *int) {
	*iPtr = 0
}

func main() {
	i := 1
	fmt.Println(i)

	zeroVal(i)
	fmt.Println(i)

	zeroPtr(&i)
	fmt.Println(i)

	fmt.Println(&i)
}
