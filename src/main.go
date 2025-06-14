//go:build main

package main

func findKthNumber(n int, k int) int {
	ans, num := 1, 1
	for range k {
		ans = num
		if num*10 <= n {
			num *= 10
		} else {
			for num%10 == 9 || num+1 > n {
				num /= 10
			}
			num++
		}
	}
	return ans
}

func main() {
  
}
