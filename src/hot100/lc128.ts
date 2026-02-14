/* eslint-disable @typescript-eslint/no-non-null-assertion */
const idx2parentIdxAndSize = new Map<
  number,
  [parentIdx: number, size: number]
>();

function find(idx: number): number {
  const [parentIdx, size] = idx2parentIdxAndSize.get(idx)!;
  let root: number;
  if (parentIdx !== idx) {
    root = find(parentIdx);
  } else {
    root = idx;
  }
  idx2parentIdxAndSize.set(idx, [root, size]);
  return root;
}

function union(idxA: number, idxB: number) {
  const sizeA = idx2parentIdxAndSize.get(idxA)![1];
  const rootB = find(idxB);
  const size = idx2parentIdxAndSize.get(rootB)![1];
  idx2parentIdxAndSize.set(idxA, [rootB, sizeA]);
  idx2parentIdxAndSize.set(rootB, [rootB, size + sizeA]);
  return size + sizeA;
}

function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  idx2parentIdxAndSize.clear();
  let ans = 1;
  for (const num of nums) {
    if (idx2parentIdxAndSize.has(num)) {
      continue;
    }
    idx2parentIdxAndSize.set(num, [num, 1]);
    if (idx2parentIdxAndSize.has(num - 1)) {
      const cur = union(num, num - 1);
      ans = Math.max(cur, ans);
    }
    if (idx2parentIdxAndSize.has(num + 1)) {
      const cur = union(num + 1, num);
      ans = Math.max(cur, ans);
    }
  }
  // console.log(idx2parentIdxAndSize);
  return ans;
}

const ans = longestConsecutive([100, 4, 200, 1, 3, 2]);
console.log(ans);
