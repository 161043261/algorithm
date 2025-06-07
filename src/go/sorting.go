//go:build sorting

package main

import (
	"fmt"
	"slices"
)

func main() {
	strSlice := []string{"c", "b", "a"}
	slices.Sort(strSlice)
  fmt.Println("strSlice:", strSlice)

  intSlice := []int{5, 2, 8}
  slices.Sort(intSlice)
  fmt.Println("intSlice:", intSlice)

  isSorted := slices.IsSorted(intSlice)
  fmt.Println("isSorted:", isSorted)
}
