package main

import (
	"strconv"
	"strings"
)

func solve3Min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func Solve3(input string) string {
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
		idx++

		stack := make([]int, 0, n)
		base := 0
		for i := 0; i < n; i++ {
			x := toInt(fields[idx])
			idx++
			if len(stack) > 0 && stack[len(stack)-1] == x {
				stack = stack[:len(stack)-1]
				base++
			} else {
				stack = append(stack, x)
			}
		}

		if len(stack) == 0 {
			answers = append(answers, strconv.Itoa(base))
			continue
		}

		m := len(stack)
		d1 := make([]int, m)
		left, right := 0, -1
		best := 1

		for i := 0; i < m; i++ {
			k := 1
			if i <= right {
				mirror := left + right - i
				k = solve3Min(d1[mirror], right-i+1)
			}

			for i-k >= 0 && i+k < m && stack[i-k] == stack[i+k] {
				k++
			}

			d1[i] = k
			if k > best {
				best = k
			}
			if i+k-1 > right {
				left = i - k + 1
				right = i + k - 1
			}
		}

		answers = append(answers, strconv.Itoa(base+best))
	}

	return strings.Join(answers, "\n")
}
