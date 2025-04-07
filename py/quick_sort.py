def quick_sort(nums: list[int], l: int, r: int) -> None:

    def partition() -> int:
        i, j = l, r # l: pivot
        while i < j:
            #! 先右
            while i < j and nums[j] >= nums[l]:
                j -= 1
            #! 后左
            while i < j and nums[i] <= nums[l]:
                i += 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[l], nums[i] = nums[i], nums[l]
        return i

    if  l >= r:
        return
    div = partition()
    quick_sort(nums, l, div - 1)
    quick_sort(nums, div + 1, r)

nums = [3, 4, 1, 5, 2]
quick_sort(nums, 0, len(nums) - 1)
print(nums)
