package hash

import (
	"slices"
	"strings"
)

func groupAnagrams(strs []string) [][]string {
	s2ss := make(map[string][]string)

	for _, str := range strs {
		ss := strings.Split(str, "")
		slices.Sort(ss)
		s := strings.Join(ss, "")
		s2ss[s] = append(s2ss[s], str)
	}

	ans := make([][]string, 0)
	for _, ss := range s2ss {
		ans = append(ans, ss)
	}
	return ans
}

var GroupAnagrams = groupAnagrams
