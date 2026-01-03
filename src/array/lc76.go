package array

func minWindow(s string, t string) string {
	wndChr2cnt := make(map[byte]int)
	tChr2cnt := make(map[byte]int)
	for _, chr := range t {
		tChr2cnt[byte(chr)]++
	}

	biggerThan := func() bool {
		for chr, cnt := range tChr2cnt {
			if wndCnt, ok := wndChr2cnt[chr]; !ok || wndCnt < cnt {
				return false
			}
		}
		return true
	}

	ansL, ansR := -1, len(s)
	l := 0
	for r, chr := range s {
		wndChr2cnt[byte(chr)] += 1
		for biggerThan() {
			if r-l < ansR-ansL {
				ansL, ansR = l, r
			}
			wndChr2cnt[s[l]] -= 1
			l++
		}
	}
	if ansL < 0 {
		return ""
	}
	return s[ansL : ansR+1]
}

var MinWindow = minWindow
