package main

func minimumDeletions(s string) int {
	memo := make([][2]int, len(s))
	var dfs func(i int, c byte) int
	dfs = func(i int, c byte) int {
		if i == len(s) {
			return 0
		}
		if memo[i][c-'a'] != 0 {
			return memo[i][c-'a']
		}
		if c == 'a' {
			res := max(1+dfs(i+1, s[i]), dfs(i+1, 'a'))
			memo[i][c-'a'] = res
			return res
		}
		if c == 'b' {
			if s[i] == 'b' {
				res := 1 + dfs(i+1, 'b')
				memo[i][c-'a'] = res
				return res
			}
			res := dfs(i+1, 'b')
			memo[i][c-'a'] = res
			return res
		}
		panic("unreachable")
	}
	return len(s) - dfs(0, 'a')
}
