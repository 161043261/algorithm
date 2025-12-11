import { createInterface } from "readline";

function buildMinHeap<T>(
  nums: T[],
  lessThan: (a: T, b: T) => boolean,
  heapSize = nums.length,
) {
  const lastLeafIdx = heapSize - 1;
  const lastNotLeafIdx = Math.floor((lastLeafIdx - 1) / 2);
  for (let idx = lastNotLeafIdx; idx >= 0; idx--) {
    minHeapify(nums, idx, lessThan);
  }
}

function minHeapify<T>(
  nums: T[],
  idx: number,
  lessThan: (a: T, b: T) => boolean,
  heapSize = nums.length,
) {
  let childIdx = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;
  if (left < heapSize && lessThan(nums[left], nums[childIdx])) {
    childIdx = left;
  }
  if (right < heapSize && lessThan(nums[right], nums[childIdx])) {
    childIdx = right;
  }
  if (childIdx !== idx) {
    [nums[idx], nums[childIdx]] = [nums[childIdx], nums[idx]];
    minHeapify(nums, childIdx, lessThan);
  }
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineno = 0;

let vertexNum = 0;
let edgeNum = 0;

interface IEdge {
  end: number;
  val: number;
}

interface IHeapNode {
  vertex: number;
  val: number;
}

let grid: IEdge[][] = [];
let inTree: boolean[];
let minDist: number[];

let start = 0;
let end = 0;

const minHeap: IHeapNode[] = [];
const lessThan = (a: IHeapNode, b: IHeapNode) => a.val < b.val;

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));

    start = 1;
    end = vertexNum;

    // initialize grid
    grid = Array.from({ length: vertexNum + 1 }, () => []);

    // initialize inTree
    inTree = new Array<boolean>(vertexNum + 1).fill(false);
    // inTree[start] = true;

    // initialize minDist
    minDist = new Array<number>(vertexNum + 1).fill(Infinity);
    minDist[start] = 0;
    return;
  }

  const [start_, end_, len_] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));

  const edge: IEdge = { end: end_, val: len_ };
  grid[start_].push(edge);

  if (lineno === edgeNum + 1) {
    main();
    rl.close();
  }
});

function main() {
  minHeap.unshift({ vertex: start, val: 0 });

  while (minHeap.length > 0) {
    const { vertex: vertexIdx_ } = minHeap[0];
    minHeap.shift();
    buildMinHeap(minHeap, lessThan);

    if (inTree[vertexIdx_]) {
      continue;
    }

    inTree[vertexIdx_] = true;

    for (const edge of grid[vertexIdx_]) {
      if (
        !inTree[edge.end] &&
        minDist[vertexIdx_] + edge.val < minDist[edge.end]
      ) {
        minDist[edge.end] = minDist[vertexIdx_] + edge.val;
        minHeap.unshift({
          vertex: edge.end,
          val: minDist[edge.end],
        });
        buildMinHeap(minHeap, lessThan);
      }
    }
  }

  if (minDist[end] === Infinity) {
    console.log(-1);
  } else {
    console.log(minDist[end]);
  }
}
