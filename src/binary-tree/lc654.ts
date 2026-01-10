class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  const getMaxIdx = (l: number, r: number): number => {
    let ret = l;
    for (let i = l + 1; i <= r; i++) {
      if (nums[i] > nums[ret]) {
        ret = i;
      }
    }
    return ret;
  };

  const f = (l: number, r: number): TreeNode | null => {
    if (l > r) {
      return null;
    }
    const maxIdx = getMaxIdx(l, r);
    const node = new TreeNode(nums[maxIdx]);
    node.left = f(l, maxIdx - 1);
    node.right = f(maxIdx + 1, r);
    return node;
  };
  return f(0, nums.length - 1);
}

export default constructMaximumBinaryTree;
