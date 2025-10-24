package array

func moveZeroes(nums []int)  {
  k := 0
  for _, num := range nums {
    if num == 0 {
      continue
    }
    nums[k] = num
    k++
  }
  for k < len(nums) {
    nums[k] = 0
    k++
  }
}

var MoveZeros = moveZeroes
