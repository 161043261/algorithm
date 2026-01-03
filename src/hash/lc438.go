package hash

func findAnagrams(s string, p string) []int {
	if len(s) < len(p) {
		return []int{}
	}

	wndChr2cnt := make(map[byte]int)
	pChr2cnt := make(map[byte]int)

	for i := range len(p) {
		wndChr2cnt[s[i]]++
		pChr2cnt[p[i]]++
	}

	equal := func() bool {
		for chr, cnt := range pChr2cnt {
			if wndCnt, ok := wndChr2cnt[chr]; !ok || wndCnt != cnt {
				return false
			}
		}
		return true
	}

	ans := make([]int, 0)
	for r := len(p); r < len(s); r++ {
		l := r - len(p)
		if equal() {
			ans = append(ans, l)
		}
		wndChr2cnt[s[l]]--
		wndChr2cnt[s[r]]++
	}

	if equal() {
		ans = append(ans, len(s)-len(p))
	}

	return ans
}

var FindAnagrams = findAnagrams
