package main

import "fmt"

func main() {
	const (
		m1 = iota // 0
		m2        // 1
		_         // 跳过
		m4        // 3
	)

	const (
		n1 = iota // 0
		n2 = 100  // 100
		n3 = iota // 2
		n4        // 3
	)

	const (
		_  = iota
		KB = 1 << (10 * iota) // 1024
		MB
	)

	const (
		a, b = iota + 1, iota + 2 // 1       2
		_, d                      // 2(跳过) 3
		e, _                      // 3       4(跳过)
	)

	fmt.Println(m1, m2, m4)      // 0 1 3
	fmt.Println(n1, n2, n3, n4)  // 0 100 2 3
	fmt.Println(KB, MB == KB*KB) // 1024 true
	fmt.Println(a, b, d, e)      // 1 2 3 3
}
