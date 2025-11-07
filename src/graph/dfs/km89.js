import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  // output: process.stdout
});

let lineno = 0;

let vertexNum = 0;
let edgeNum = 0;
let /** @type {number[][]} */ grid;
const /** @type {number[][]} */ ans = [];

function main() {
  /**
   *
   * @param {number} cur
   * @param {number[]} path
   * @returns
   */
  const dfs = (cur, path) => {
    if (cur === vertexNum) {
      ans.push([...path]);
      return;
    }

    for (const next of grid[cur]) {
      path.push(next);
      dfs(next, path);
      path.pop();
    }
  };

  dfs(1, [1]);
  if (ans.length > 0) {
    for (const item of ans) {
      console.log(item.join(" "));
    }
  } else {
    console.log(-1);
  }
}

rl.on("line", (line) => {
  lineno++;

  if (lineno === 1) {
    [vertexNum, edgeNum] = line.split(" ").map((item) => Number.parseInt(item));
    grid = Array.from({ length: vertexNum + 1 }, () => []);
    return;
  }

  const [start, end] = line.split(" ").map((item) => Number.parseInt(item));
  grid[start].push(end);

  if (lineno === 1 + edgeNum) {
    main();
    rl.close();
  }
});
