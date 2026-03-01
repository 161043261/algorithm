// @ts-check
import { createInterface } from "readline";

let /** @type {number} */ nodeNum = 0;
let /** @type {number} */ edgeNum = 0;

const /** @type {Map<number, number[]>} */ graph = new Map();

let /** @type {number} */ lineno = 0;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  lineno++;
  if (lineno === 1) {
    [nodeNum, edgeNum] = line
      .trim()
      .split(" ")
      .map((item) => Number.parseInt(item));
    return;
  }

  const [start, end] = line
    .trim()
    .split(" ")
    .map((item) => Number.parseInt(item));

  if (graph.has(start)) {
    graph.get(start)?.push(end);
  } else {
    graph.set(start, [end]);
  }

  if (lineno === edgeNum + 1) {
    main();
    rl.close();
  }
});

const /** @type {boolean[]} */ visit = new Array(nodeNum + 1).fill(false);

/**
 *
 * @param {number} key
 */
function dfs(key) {
  visit[key] = true;

  if (graph.has(key)) {
    for (const sibling of graph.get(key) ?? []) {
      if (!visit[sibling]) {
        dfs(sibling);
      }
    }
  }
}

function main() {
  dfs(1);
  for (const item of visit.slice(1)) {
    if (!item) {
      process.stdout.write("-1\n");
      process.exit(0);
    }
  }

  process.stdout.write("1\n");
}
