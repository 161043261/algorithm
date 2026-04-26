package main

import (
	"sort"
	"strconv"
	"strings"
)

type interval2 struct {
	r int
	l int
	w int64
}

func solve2Max64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}

func Solve2(input string) string {
	fields := strings.Fields(input)
	if len(fields) == 0 {
		return ""
	}

	toInt := func(s string) int {
		v, _ := strconv.Atoi(s)
		return v
	}

	idx := 0
	t := toInt(fields[idx])
	idx++
	answers := make([]string, 0, t)

	for tc := 0; tc < t; tc++ {
		n := toInt(fields[idx])
		m := toInt(fields[idx+1])
		idx += 2

		prefix := make([]int64, n+1)
		for i := 1; i <= n; i++ {
			prefix[i] = prefix[i-1] + int64(toInt(fields[idx]))
			idx++
		}

		intervals := make([]interval2, m)
		for i := 0; i < m; i++ {
			l := toInt(fields[idx])
			r := toInt(fields[idx+1])
			idx += 2
			w := prefix[r] - prefix[l-1]
			intervals[i] = interval2{r: r, l: l, w: w}
		}

		sort.Slice(intervals, func(i, j int) bool {
			if intervals[i].r != intervals[j].r {
				return intervals[i].r < intervals[j].r
			}
			return intervals[i].l < intervals[j].l
		})

		ends := make([]int, m)
		for i := 0; i < m; i++ {
			ends[i] = intervals[i].r
		}

		dp := make([]int64, m+1)
		for i := 1; i <= m; i++ {
			cur := intervals[i-1]
			prev := sort.SearchInts(ends, cur.l)
			dp[i] = solve2Max64(dp[i-1], dp[prev]+cur.w)
		}

		answers = append(answers, strconv.FormatInt(dp[m], 10))
	}

	return strings.Join(answers, "\n")
}
