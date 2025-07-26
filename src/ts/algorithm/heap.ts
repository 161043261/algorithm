// 大/小根堆是满二叉树
// 大根堆: 父节点 >= 左右子节点; 小根堆: 父节点 <= 左右子节点
// 最后一个叶子节点的数组下标 const lastLeafIdx = heapSize - 1;
// 最后一个叶子节点的父节点是最后一个非叶节点
// 最后一个非叶节点的数组下标 const lastNotLeafIdx = Math.floor((lastLeafIdx - 1) / 2)
// 从最后一个非叶节点开始, 构造大/小根堆
function buildMaxHeap(nums: number[], heapSize: number) {
  const lastLeafIdx = heapSize - 1;
  const lastNotLeafIdx = Math.floor((lastLeafIdx - 1) / 2);
  for (let idx = lastNotLeafIdx; idx >= 0; idx--) {
    maxHeapify(nums, idx, heapSize);
  }
}

function buildMinHeap(nums: number[], heapSize: number) {
  const lastLeafIdx = heapSize - 1;
  const lastNotLeafIdx = Math.floor((lastLeafIdx - 1) / 2);
  for (let idx = lastNotLeafIdx; idx >= 0; idx--) {
    minHeapify(nums, idx, heapSize);
  }
}

/**
 *
 * @param nums nums.slice(0, heapSize) 大根堆节点数组
 * @param idx 当前调整的节点的数组下标
 * @param heapSize 大根堆的大小
 * @description 构造大根堆: 小节点不断下沉
 */
function maxHeapify(nums: number[], idx: number, heapSize: number) {
  let childIdx = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;
  if (left < heapSize && nums[left] > nums[childIdx]) {
    childIdx = left;
  }
  if (right < heapSize && nums[right] > nums[childIdx]) {
    childIdx = right;
  }
  if (childIdx !== idx) {
    [nums[idx], nums[childIdx]] = [nums[childIdx], nums[idx]];
    maxHeapify(nums, childIdx, heapSize);
  }
}

/**
 *
 * @param nums nums.slice(0, heapSize) 小根堆节点数组
 * @param idx 当前调整的节点的数组下标
 * @param heapSize 小根堆的大小
 * @description 构造小根堆: 大节点不断下沉
 */
function minHeapify(nums: number[], idx: number, heapSize: number) {
  let childIdx = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;
  if (left < heapSize && nums[left] < nums[childIdx]) {
    childIdx = left;
  }
  if (right < heapSize && nums[right] < nums[childIdx]) {
    childIdx = right;
  }
  if (childIdx !== idx) {
    [nums[idx], nums[childIdx]] = [nums[childIdx], nums[idx]];
    minHeapify(nums, childIdx, heapSize);
  }
}

// e.g.
function findKthMaximum(nums: number[], k: number): number {
  let heapSize = nums.length;
  buildMaxHeap(nums, heapSize);
  const targetHeapSize = nums.length - k + 1;
  while (heapSize > targetHeapSize) {
    const lastLeafIdx = heapSize - 1;
    // nums[0] 大根堆的堆顶节点 (最大值)
    // 将堆顶节点与最后一个叶子节点交换
    [nums[0], nums[lastLeafIdx]] = [nums[lastLeafIdx], nums[0]];
    // 再将 heapSize -= 1, 等价于将堆顶节点出堆
    heapSize--;
    // 出堆后, 重新调整大根堆
    maxHeapify(nums, 0, heapSize);
  }
  return nums[0];
}

// e.g.
function findKthMinimum(nums: number[], k: number): number {
  let heapSize = nums.length;
  buildMinHeap(nums, heapSize);
  const targetHeapSize = nums.length - k + 1;
  while (heapSize > targetHeapSize) {
    const lastLeafIdx = heapSize - 1;
    // nums[0] 小根堆的堆顶节点 (最小值)
    // 将堆顶节点与最后一个叶子节点交换
    [nums[0], nums[lastLeafIdx]] = [nums[lastLeafIdx], nums[0]];
    // 再将 heapSize -= 1, 等价于将堆顶节点出堆
    heapSize--;
    // 出堆后, 重新调整小根堆
    minHeapify(nums, 0, heapSize);
  }
  return nums[0];
}

console.log(findKthMaximum([4, 1, 6, 4, 3, 2, 5, 1], 2)); // 5
console.log(findKthMinimum([4, 1, 6, 4, 3, 2, 5, 1], 2)); // 1
