class SegmentTreeNode {
  left: SegmentTreeNode | null = null; // 左子节点
  right: SegmentTreeNode | null = null; // 右子节点
  val = 0; // 区间值
  lazyTag?: number; // 懒惰标记
}

class SegmentTree {
  root: SegmentTreeNode = new SegmentTreeNode();

  constructor(
    // 值域 [minVal, maxVal]
    public minVal: number,
    public maxVal: number,
    // 聚合函数
    public cb: (a: number, b: number) => number = (a, b) => a + b,
    // 单位元（sum=0, min=Infinity, max=-Infinity）
    public fallback = 0,
  ) {}

  // 确保左子节点存在
  private ensureLeft(node: SegmentTreeNode): SegmentTreeNode {
    if (!node.left) {
      node.left = new SegmentTreeNode();
    }
    return node.left;
  }

  // 确保右子节点存在
  private ensureRight(node: SegmentTreeNode): SegmentTreeNode {
    if (!node.right) {
      node.right = new SegmentTreeNode();
    }
    return node.right;
  }

  // 向上更新
  private pushUp(node: SegmentTreeNode) {
    const leftVal = node.left?.val ?? this.fallback;
    const rightVal = node.right?.val ?? this.fallback;
    node.val = this.cb(leftVal, rightVal);
  }

  // 下推懒惰标记
  private pushDown(node: SegmentTreeNode, l: number, r: number) {
    const tag = node.lazyTag;
    if (tag === undefined) {
      return;
    }

    const mid = Math.floor((l + r) / 2);
    const leftChild = this.ensureLeft(node);
    const rightChild = this.ensureRight(node);

    // 下推到左子节点
    const leftSize = mid - l + 1;
    leftChild.val += tag * leftSize;
    leftChild.lazyTag = (leftChild.lazyTag ?? 0) + tag;

    // 下推到右子节点
    const rightSize = r - mid;
    rightChild.val += tag * rightSize;
    rightChild.lazyTag = (rightChild.lazyTag ?? 0) + tag;

    // 清除当前懒惰标记
    node.lazyTag = undefined;
  }

  // 单点更新
  update(idx: number, newVal: number) {
    const dfs = (node: SegmentTreeNode, l: number, r: number) => {
      if (l === r) {
        node.val = newVal;
        return;
      }
      this.pushDown(node, l, r);
      const mid = Math.floor((l + r) / 2);
      if (idx <= mid) {
        dfs(this.ensureLeft(node), l, mid);
      } else {
        dfs(this.ensureRight(node), mid + 1, r);
      }
      this.pushUp(node);
    };
    dfs(this.root, this.minVal, this.maxVal);
  }

  // 单点增加
  add(idx: number, delta: number) {
    const dfs = (node: SegmentTreeNode, l: number, r: number) => {
      if (l === r) {
        node.val += delta;
        return;
      }
      this.pushDown(node, l, r);
      const mid = Math.floor((l + r) / 2);
      if (idx <= mid) {
        dfs(this.ensureLeft(node), l, mid);
      } else {
        dfs(this.ensureRight(node), mid + 1, r);
      }
      this.pushUp(node);
    };
    dfs(this.root, this.minVal, this.maxVal);
  }

  // 区间查询
  query(left: number, right: number): number {
    const dfs = (
      node: SegmentTreeNode | null,
      l: number,
      r: number,
    ): number => {
      if (!node) return this.fallback;
      // 完全包含
      if (left <= l && r <= right) {
        return node.val;
      }
      // 完全不相交
      if (r < left || l > right) {
        return this.fallback;
      }
      this.pushDown(node, l, r);
      const mid = Math.floor((l + r) / 2);
      let res = this.fallback;
      if (left <= mid) {
        res = this.cb(res, dfs(node.left, l, mid));
      }
      if (right > mid) {
        res = this.cb(res, dfs(node.right, mid + 1, r));
      }
      return res;
    };
    return dfs(this.root, this.minVal, this.maxVal);
  }

  // 区间加减
  rangeAdd(left: number, right: number, delta: number) {
    const dfs = (node: SegmentTreeNode, l: number, r: number) => {
      // 完全包含
      if (left <= l && r <= right) {
        const size = r - l + 1;
        node.val += delta * size;
        node.lazyTag = (node.lazyTag ?? 0) + delta;
        return;
      }
      // 完全不相交
      if (r < left || l > right) {
        return;
      }
      this.pushDown(node, l, r);
      const mid = Math.floor((l + r) / 2);
      if (left <= mid) {
        dfs(this.ensureLeft(node), l, mid);
      }
      if (right > mid) {
        dfs(this.ensureRight(node), mid + 1, r);
      }
      this.pushUp(node);
    };
    dfs(this.root, this.minVal, this.maxVal);
  }
}

export default SegmentTree;
