/* eslint-disable @typescript-eslint/no-unused-vars */
function sortColors(nums: number[]) {
  /**
   *
   * @param {number[]} heap
   * @param {number} heapSize
   */
  const buildMinHeap = (heap: number[], heapSize: number) => {
    const lastLeafIdx = heapSize - 1;
    const lastNotLeafIdx = Math.floor((lastLeafIdx - 1) / 2);
    for (let idx = lastNotLeafIdx; idx >= 0; idx--) {
      minHeapify(heap, heapSize, idx);
    }
  };

  /**
   *
   * @param {number[]} heap
   * @param {number} heapSize
   */
  const buildMaxHeap = (heap: number[], heapSize: number) => {
    const lastLeafIdx = heapSize - 1;
    const lastNotLeafIdx = Math.floor((lastLeafIdx - 1) / 2);
    for (let idx = lastNotLeafIdx; idx >= 0; idx--) {
      maxHeapify(heap, heapSize, idx);
    }
  };

  const minHeapify = (heap: number[], heapSize: number, idx: number) => {
    let childIdx = idx;
    const leftChildIdx = idx * 2 + 1;
    const rightChildIdx = leftChildIdx + 1;
    if (leftChildIdx < heapSize && heap[leftChildIdx] < heap[childIdx]) {
      childIdx = leftChildIdx;
    }
    if (rightChildIdx < heapSize && heap[rightChildIdx] < heap[childIdx]) {
      childIdx = rightChildIdx;
    }
    if (childIdx === idx) {
      return;
    }
    [heap[idx], heap[childIdx]] = [heap[childIdx], heap[idx]];
    minHeapify(heap, heapSize, childIdx);
  };

  const maxHeapify = (heap: number[], heapSize: number, idx: number) => {
    let childIdx = idx;
    const leftChildIdx = idx * 2 + 1;
    const rightChildIdx = leftChildIdx + 1;
    if (leftChildIdx < heapSize && heap[leftChildIdx] > heap[childIdx]) {
      childIdx = leftChildIdx;
    }
    if (rightChildIdx < heapSize && heap[rightChildIdx] > heap[childIdx]) {
      childIdx = rightChildIdx;
    }
    if (childIdx === idx) {
      return;
    }
    [heap[idx], heap[childIdx]] = [heap[childIdx], heap[idx]];
    maxHeapify(heap, heapSize, childIdx);
  };

  let heapSize = nums.length;
  buildMaxHeap(nums, heapSize);
  for (; heapSize > 0; heapSize--) {
    [nums[0], nums[heapSize - 1]] = [nums[heapSize - 1], nums[0]];
    maxHeapify(nums, heapSize - 1, 0);
  }
  return nums;
}

sortColors([2, 0, 2, 1, 1, 0]);
