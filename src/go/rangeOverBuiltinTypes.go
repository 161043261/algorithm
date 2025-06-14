//go:build rangeOverBuiltinTypes

package main

import "fmt"

func main() {

	// Range over string
	for idx, aRune /* rune (int32) */ := range "go" {
    // 0 103
    // 1 111
		fmt.Println(idx, aRune)
    // 0 g
    // 1 o
    fmt.Printf("%d %c\n", idx, aRune)
	}

	// Range over slice
	nums := []int{1, 2, 3}
	sum := 0
	for _ /* idx */, num := range nums {
		sum += num
	}
	fmt.Println("sum:", sum)

  // Range over map
	kvs := map[rune]string{'a': "Aa", 'b': "Bb"}
	for k, v := range kvs {
    // a -> Aa
    // b -> Bb
		fmt.Printf("%c -> %v\n", k, v)
	}
}
