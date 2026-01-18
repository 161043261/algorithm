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

function rob(root: TreeNode | null): number {
  const trueMap = new Map<TreeNode, number>();
  const falseMap = new Map<TreeNode, number>();
  const dfs = (cur: TreeNode | null, useParent: boolean): number => {
    if (cur === null) {
      return 0;
    }
    if (useParent) {
      if (trueMap.has(cur)) {
        return trueMap.get(cur) ?? NaN;
      }
      const res = dfs(cur.left, false) + dfs(cur.right, false);
      trueMap.set(cur, res);
      return res;
    } else {
      if (falseMap.has(cur)) {
        return falseMap.get(cur) ?? NaN;
      }
      const res = Math.max(
        cur.val + dfs(cur.left, true) + dfs(cur.right, true),
        dfs(cur.left, false) + dfs(cur.right, false),
      );
      falseMap.set(cur, res);
      return res;
    }
  };
  return dfs(root, false);
}

export default rob;
