package main

import (
	"slices"
	"strings"
)

func makeLargestSpecial(s string) string {
	cur, last := 0, 0
	ret := []string{}
	for i, c /* rune */ := range s {
		if c == '1' {
			cur++
		} else {
			cur--
		}
		if cur == 0 {
			ret = append(ret, "1"+makeLargestSpecial(s[last+1:i])+"0")
			last = i + 1
		}
	}
	slices.SortFunc(ret, func(a, b string) int {
		return strings.Compare(b, a)
	})
	return strings.Join(ret, "")
}
