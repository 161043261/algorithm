from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        nums.sort(key=lambda item: item)
        self.nums: List[int] = nums
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
