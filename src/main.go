package main

import (
	"fmt"

	"github.com/161043261/algorithm/src/array"
)

func main() {
	nums := []int{0, 1, 0, 3, 12}
	array.MoveZeros(nums)
	fmt.Println(nums)
}
