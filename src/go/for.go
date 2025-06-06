//go:build for

package main

import "fmt"

func main() {
	i := 1
	for i <= 3 { // while
		fmt.Println(i) // 1 2 3
		i++
	}

	for j := 0; j < 3; j++ {
		fmt.Println(j) // 0 1 2
	}

	for {
		// Infinite loop
		fmt.Println("loop")
		break
	}

	for k := range 3 {
		fmt.Println(k) // 0 1 2
	}

	arr := [3]int{3, 4, 5}

	for idx := range arr {
		fmt.Println(idx) // 0 1 2
	}

	for _, val := range arr {
		fmt.Println(val) // 3 4 5
	}

	for idx, val := range arr {
		fmt.Println(idx, val) // 0 4; 1 5; 2 6
	}
}
