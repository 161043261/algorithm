/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @param {number} k 边数小于等于 k
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2, k) {
  if (k <= 0) {
    return new Array(edges1.length).fill(1);
  }

  /**
   *
   * @param {number[][]} edges
   * @return {number[][]}
   */
  const buildTree = (edges) => {
    // const tree = new Array(edges.length).fill([]);
    const tree = Array.from({ length: edges.length }, () => []);
    for (const [curr, next] of edges) {
      tree[curr].push(next);
      tree[next].push(curr);
    }
    return tree;
  };

  const tree1 = buildTree(edges1);
  const tree2 = buildTree(edges2);

  /**
   *
   * @param {number} curr
   * @param { number} parent
   * @param {number} depth
   * @param {number[][]} tree
   * @returns
   */
  const dfs = (curr, parent, depth, tree) => {
    if (depth > k) {
      return 0;
    }
    let ret = 1;
    for (const next of tree[curr]) {
      if (next !== parent) {
        ret += dfs(next, curr, depth + 1, tree);
      }
    }
    return ret;
  };

  let max2 = 0;
  for (let i = 0; i < edges2.length; i++) {
    max2 = Math.max(max2, dfs(i, -1, 0, tree2, k - 1));
  }
  const ans = new Array(edges1.length).fill(0);
  for (let i = 0; i < tree1.length; i++) {
    ans[i] = dfs(i, -1, 0, tree1, k) + max2;
  }
  return ans;
};

maxTargetNodes(
  [
    [0, 1],
    [0, 2],
    [2, 3],
    [2, 4],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [2, 7],
    [1, 4],
    [4, 5],
    [4, 6],
  ],
  2,
);
