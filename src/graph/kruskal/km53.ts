import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

let vertexNum = 0;
let edgeNum = 0;
let parentIdx: number[] = [];

interface IEdge {
  left: number;
  right: number;
  val: number;
}

const edges: IEdge[] = [];

let ans = 0;

rl.on("line", (line) => {
  lineno += 1;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    parentIdx = Array.from({ length: vertexNum + 1 }, (_, idx) => idx);
    return;
  }

  const [left, right, val] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));

  edges.push({ left, right, val });

  if (lineno === 1 + edgeNum) {
    main();
    console.log(ans);
    rl.close();
  }
});

function union(idxA: number, idxB: number) {
  const rootA = find(idxA);
  const rootB = find(idxB);
  parentIdx[rootA] = rootB;
}

function find(idx: number): number {
  const pIdx = parentIdx[idx];
  if (pIdx === idx) {
    return idx;
  }

  const root = find(pIdx);
  parentIdx[idx] = root;
  return root;
}

function main() {
  edges.sort((a, b) => a.val - b.val);

  for (const { left, right, val } of edges) {
    const rootL = find(left);
    const rootR = find(right);
    if (rootL != rootR) {
      ans += val;
      union(rootL, rootR);
    }
  }
}
