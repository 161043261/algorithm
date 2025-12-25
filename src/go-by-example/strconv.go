//go:build strconv

package main

import (
	"fmt"
	"strconv"
)

func main() {

	f, _ := strconv.ParseFloat("1.234", 64 /* bitSize  */)
	fmt.Println(f) // 1.234

	i, _ := strconv.ParseInt("123", 10 /* base  */, 64 /* bitSize  */)
	fmt.Println(i) // 123

	d, _ := strconv.ParseInt("0x1c8", 0 /* base  */, 64 /* bitSize  */)
	fmt.Println(d) // 456
	d2, _ := strconv.ParseInt("1c8", 16 /* base  */, 64 /* bitSize  */)
	fmt.Println(d2) // 456

	u, _ := strconv.ParseUint("789", 10 /* base  */, 64 /* bitSize  */)
	fmt.Println(u) // 789

	k, _ := strconv.Atoi("135")
	fmt.Println(k) // 135

	_, e := strconv.Atoi("nan")
	fmt.Println(e) // strconv.Atoi: parsing "nan": invalid syntax
}
