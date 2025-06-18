//go:build numberParsing

package main

import (
	"fmt"
	"strconv"
)

func main() {
	aFloat, _ := strconv.ParseFloat("1.234", 64 /* bitSize */)
	fmt.Println(aFloat)

	aInt, _ := strconv.ParseInt("123", 0 /* base */, 64 /* bitSize */)
	fmt.Println(aInt)

	aInt2, _ := strconv.ParseInt("0x1c8", 0, 64)
	fmt.Println(aInt2)

	unsizedInt, _ := strconv.ParseUint("789", 0, 64)
	fmt.Println(unsizedInt)

	aInt3, _ := strconv.Atoi("135")
	fmt.Println(aInt3)

	if _, err := strconv.Atoi("wtf"); err != nil {
		fmt.Println(err)
	}
}
