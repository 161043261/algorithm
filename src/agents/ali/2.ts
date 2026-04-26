import fs from "fs";

interface Interval {
  r: number;
  l: number;
  w: number;
}

function lowerBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = (left + right) >> 1;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

function solve(input: string): string {
  const data = input.trim().split(/\s+/).map(Number);
  if (data.length === 0 || Number.isNaN(data[0])) {
    return "";
  }

  let idx = 0;
  const t = data[idx++];
  const answers: string[] = [];

  for (let tc = 0; tc < t; tc++) {
    const n = data[idx++];
    const m = data[idx++];

    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      prefix[i] = prefix[i - 1] + data[idx++];
    }

    const intervals: Interval[] = [];
    for (let i = 0; i < m; i++) {
      const l = data[idx++];
      const r = data[idx++];
      const w = prefix[r] - prefix[l - 1];
      intervals.push({ r, l, w });
    }

    intervals.sort((a, b) => (a.r !== b.r ? a.r - b.r : a.l - b.l));

    const ends = intervals.map((item) => item.r);
    const dp = new Array<number>(m + 1).fill(0);

    for (let i = 1; i <= m; i++) {
      const cur = intervals[i - 1];
      const prev = lowerBound(ends, cur.l);
      dp[i] = Math.max(dp[i - 1], dp[prev] + cur.w);
    }

    answers.push(String(dp[m]));
  }

  return answers.join("\n");
}

const input = fs.readFileSync(0, "utf8");
const output = solve(input);
if (output.length > 0) {
  process.stdout.write(output);
}
