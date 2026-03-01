from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        self.path: List[int] = []
        self.ans: List[List[int]] = []
        self.nums: List[int] = nums
        self.backtrack(0)
        return self.ans

    def backtrack(self, idx: int) -> None:
        self.ans.append(self.path[:])

        if idx == len(self.nums):
            return

        for i in range(idx, len(self.nums)):
            # if i > idx and self.nums[i] == self.nums[i - 1]:
            #     continue
            self.path.append(self.nums[i])
            self.backtrack(i + 1)
            self.path.pop()


if __name__ == "__main__":
    ans = Solution().subsets([1, 2, 3])
    print(ans)
