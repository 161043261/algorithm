//go:build main
package main

func divideString(s string, k int, fill byte) []string {
	item := []rune{}
	ans := []string{}
	// field2score := make(map[string]float64)

	for _, r := range s {
		if len(item) < k {
			item = append(item, r)
		} else {
			ans = append(ans, string(item))
			item = []rune{r}
		}
	}
	if len(item) > 0 {
		rest := k - len(item)

		if rest > 0 {
			for range rest {
				item = append(item, rune(fill))
			}
		}

		ans = append(ans, string(item))
	}
	return ans
}

func main() {

}
