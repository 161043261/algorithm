class SegmentTreeNode {
  left: SegmentTreeNode | null = null; // 左子节点
  right: SegmentTreeNode | null = null; // 右子节点
  val = 0; // 覆盖长度
  cnt = 0; // 覆盖次数
  lazyTag?: number; // 懒惰标记
}

class SegmentTree {
  root: SegmentTreeNode = new SegmentTreeNode();

  constructor(
    public minVal: number,
    public maxVal: number,
    public xs: number[],
  ) {}

  private ensureLeft(node: SegmentTreeNode): SegmentTreeNode {
    if (!node.left) node.left = new SegmentTreeNode();
    return node.left;
  }

  private ensureRight(node: SegmentTreeNode): SegmentTreeNode {
    if (!node.right) node.right = new SegmentTreeNode();
    return node.right;
  }

  private pushUp(node: SegmentTreeNode, l: number, r: number) {
    if (node.cnt > 0) {
      node.val = this.xs[r + 1] - this.xs[l];
    } else if (l === r) {
      node.val = 0;
    } else {
      node.val = (node.left?.val ?? 0) + (node.right?.val ?? 0);
    }
  }

  rangeUpdate(left: number, right: number, delta: number) {
    const dfs = (node: SegmentTreeNode, l: number, r: number) => {
      // 完全包含
      if (left <= l && r <= right) {
        node.cnt += delta;
        this.pushUp(node, l, r);
        return;
      }
      // 完全不相交
      if (r < left || l > right) return;
      const mid = Math.floor((l + r) / 2);
      if (left <= mid) {
        dfs(this.ensureLeft(node), l, mid);
      }
      if (right > mid) {
        dfs(this.ensureRight(node), mid + 1, r);
      }
      this.pushUp(node, l, r);
    };
    dfs(this.root, this.minVal, this.maxVal);
  }

  getCoveredLength(): number {
    return this.root.val;
  }

  reset() {
    this.root = new SegmentTreeNode();
  }
}

function separateSquares(squares: number[][]): number {
  const xSet = new Set<number>();
  for (const [x, , len] of squares) {
    xSet.add(x);
    xSet.add(x + len);
  }
  const xs = Array.from(xSet).sort((a, b) => a - b);
  const xToIdx = new Map<number, number>();
  xs.forEach((x, i) => xToIdx.set(x, i));
  const events: [number, number, number, number][] = [];
  for (const [x, y, len] of squares) {
    events.push([y, 1, x, x + len]);
    events.push([y + len, -1, x, x + len]);
  }
  events.sort((a, b) => a[0] - b[0]);
  const n = xs.length;
  const tree = new SegmentTree(0, n - 2, xs);
  let totalArea = 0;
  let prevY = events[0][0];
  for (const [y, type, x1, x2] of events) {
    totalArea += tree.getCoveredLength() * (y - prevY);
    const l = xToIdx.get(x1) ?? 0;
    const r = (xToIdx.get(x2) ?? 0) - 1;
    tree.rangeUpdate(l, r, type);
    prevY = y;
  }
  tree.reset();
  const halfArea = totalArea / 2;
  let curArea = 0;
  prevY = events[0][0];
  for (const [y, type, x1, x2] of events) {
    const deltaY = y - prevY;
    const coveredLen = tree.getCoveredLength();
    if (coveredLen > 0 && deltaY > 0) {
      const areaInStrip = coveredLen * deltaY;
      if (curArea + areaInStrip >= halfArea) {
        const need = halfArea - curArea;
        return prevY + need / coveredLen;
      }
      curArea += areaInStrip;
    }
    const l = xToIdx.get(x1) ?? 0;
    const r = (xToIdx.get(x2) ?? 0) - 1;
    tree.rangeUpdate(l, r, type);
    prevY = y;
  }

  return -1;
}

export default separateSquares;
