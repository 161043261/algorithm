from typing import List
from threading import Lock
from concurrent.futures import Future, ThreadPoolExecutor
from copy import deepcopy

class Solution:
    def countValidSelections(self, nums: List[int]) -> int:

        def reset0(nums: List[int], cur: int, delta: int) -> bool:
            while 0 <= cur < len(nums):
                if nums[cur] == 0:
                    cur += delta
                    continue
                if nums[cur] > 0:
                    nums[cur] -= 1
                    delta = -delta
                    cur += delta
            for num in nums:
                if num != 0:
                    return False
            return True

        ans = 0
        ans_lock = Lock()

        with ThreadPoolExecutor() as executor:
            futures: List[Future[bool]] = []
            for i in range(len(nums)):
                if nums[i] != 0:
                    continue
                futures.append(executor.submit(reset0, deepcopy(nums), i, 1))
                futures.append(executor.submit(reset0, deepcopy(nums), i, -1))
            for f in futures:
                if f.result():
                    with ans_lock:
                        ans += 1

        return ans
