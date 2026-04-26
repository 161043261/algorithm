package main

import (
	"strconv"
)

func minMirrorPairDistance(nums []int) int {
	num2Index := make(map[int][]int)
	ans := len(nums)
	for idx, num := range nums {
		str := strconv.Itoa(num)

		runes := []rune(str)
		for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
			runes[i], runes[j] = runes[j], runes[i]
		}
		rev := string(runes)
		revNum, _ := strconv.Atoi(rev)
		indexes := num2Index[revNum]
		if len(indexes) == 0 {
			num2Index[num] = append(num2Index[num], idx)
			continue
		}
		ans = min(ans, idx-indexes[len(indexes)-1])
		num2Index[num] = append(num2Index[num], idx)
	}
	return ans
}

func main() {
	minMirrorPairDistance([]int{120, 21})
}

func mirrorDistance(n int) int {
  str := strconv.Itoa(n)
  runes := []rune(str)
  for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
    runes[i], runes[j] = runes[j], runes[i]
  }
  rev := string(runes)
  revNum, _ := strconv.Atoi(rev)
  if (n - revNum) < 0 {
    return -n + revNum
  }
  return n - revNum
}
