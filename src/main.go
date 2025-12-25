package main

import "slices"

func maximumHappinessSum(happiness []int, k int) int64 {
	slices.SortFunc(happiness, func(a, b int) int {
		return b - a
	})

	v := 0
	ans := int64(0)
	for _, h := range happiness[:k] {
		ans += int64(max(0, h-v))
		v++
	}
	return ans
}
