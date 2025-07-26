/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @typedef {object} TreeNode
 * @property {TreeNode | undefined} left
 * @property {TreeNode | undefined} right
 * @property {number} val
 *
 * @param {TreeNode} root
 * @return {string[]}
 */
function binaryTreePaths(root) {
  const /** @type {string[]} */ ans = [];

  /**
   *
   * @param {TreeNode} node
   * @param {string[]} pathArr
   */
  const dfs = (node, pathArr) => {
    pathArr.push(node.val);

    if (!node.left && !node.right) {
      ans.push(pathArr.join("->"));
      pathArr.pop();
      return;
    }

    if (node.left) {
      dfs(node.left, pathArr);
    }
    if (node.right) {
      dfs(node.right, pathArr);
    }
    pathArr.pop();
  };

  if (root) {
    dfs(root, []);
  }
  return ans;
}
