from typing import List


def buildMaxHeap(nums: List[int], heapSize: int) -> None:
    lastLeafIdx = heapSize - 1
    # lastNotLeafIdx = (lastLeafIdx - 1) // 2
    lastNotLeafIdx = (lastLeafIdx - 1) >> 1
    for idx in range(lastNotLeafIdx, -1, -1):
        maxHeapify(nums, idx, heapSize)


def buildMinHeap(nums: List[int], heapSize: int) -> None:
    lastLeafIdx = heapSize - 1
    # lastNotLeafIdx = (lastLeafIdx - 1) // 2
    lastNotLeafIdx = (lastLeafIdx - 1) >> 1
    for idx in range(lastNotLeafIdx, -1, -1):
        minHeapify(nums, idx, heapSize)


def maxHeapify(nums: List[int], idx: int, heapSize: int) -> None:
    childIdx = idx
    left = 2 * idx + 1
    right = 2 * idx + 2
    if left < heapSize and nums[left] > nums[childIdx]:
        childIdx = left
    if right < heapSize and nums[right] > nums[childIdx]:
        childIdx = right
    if childIdx != idx:
        nums[idx], nums[childIdx] = nums[childIdx], nums[idx]
        maxHeapify(nums, childIdx, heapSize)


def minHeapify(nums: List[int], idx: int, heapSize: int) -> None:
    childIdx = idx
    left = 2 * idx + 1
    right = 2 * idx + 2
    if left < heapSize and nums[left] < nums[childIdx]:
        childIdx = left
    if right < heapSize and nums[right] < nums[childIdx]:
        childIdx = right
    if childIdx != idx:
        nums[idx], nums[childIdx] = nums[childIdx], nums[idx]
        minHeapify(nums, childIdx, heapSize)


def findKthMaximum(nums: List[int], k: int) -> int:
    heapSize = len(nums)
    buildMaxHeap(nums, heapSize)
    targetHeapSize = len(nums) - k + 1
    while heapSize > targetHeapSize:
        lastLeafIdx = heapSize - 1
        nums[0], nums[lastLeafIdx] = nums[lastLeafIdx], nums[0]
        heapSize -= 1
        maxHeapify(nums, 0, heapSize)

    return nums[0]


def findKthMinimum(nums: List[int], k: int) -> int:
    heapSize = len(nums)
    buildMinHeap(nums, heapSize)
    targetHeapSize = len(nums) - k + 1
    while heapSize > targetHeapSize:
        lastLeafIdx = heapSize - 1
        nums[0], nums[lastLeafIdx] = nums[lastLeafIdx], nums[0]
        heapSize -= 1
        minHeapify(nums, 0, heapSize)

    return nums[0]


findKthMaximum([4, 1, 6, 4, 3, 2, 5, 1], 2)
findKthMinimum([4, 1, 6, 4, 3, 2, 5, 1], 2)
