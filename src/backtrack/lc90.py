from typing import List


class Solution:
    path: List[int]
    ans: List[List[int]]
    nums: List[int]

    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        self.path = []
        self.ans = []
        nums.sort(key=lambda item: item)
        self.nums = nums
        self.backtrack(0)
        return self.ans

    def backtrack(self, idx: int) -> None:
        self.ans.append(self.path[:])

        if idx == len(self.nums):
            return

        for i in range(idx, len(self.nums)):
            if i > idx and self.nums[i] == self.nums[i - 1]:
                continue
            self.path.append(self.nums[i])
            self.backtrack(i + 1)
            self.path.pop()


if __name__ == "__main__":
    ans = Solution().subsetsWithDup([1, 2, 2])
    print(ans)
