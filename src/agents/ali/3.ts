import * as fs from "fs";

function solve3Min(a: number, b: number): number {
  return a < b ? a : b;
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
    const stack: number[] = [];
    let base = 0;

    for (let i = 0; i < n; i++) {
      const x = data[idx++];
      if (stack.length > 0 && stack[stack.length - 1] === x) {
        stack.pop();
        base++;
      } else {
        stack.push(x);
      }
    }

    if (stack.length === 0) {
      answers.push(String(base));
      continue;
    }

    const m = stack.length;
    const d1 = new Array<number>(m).fill(0);
    let left = 0;
    let right = -1;
    let best = 1;

    for (let i = 0; i < m; i++) {
      let k = 1;
      if (i <= right) {
        const mirror = left + right - i;
        k = solve3Min(d1[mirror], right - i + 1);
      }

      while (i - k >= 0 && i + k < m && stack[i - k] === stack[i + k]) {
        k++;
      }

      d1[i] = k;
      if (k > best) {
        best = k;
      }
      if (i + k - 1 > right) {
        left = i - k + 1;
        right = i + k - 1;
      }
    }

    answers.push(String(base + best));
  }

  return answers.join("\n");
}

const input = fs.readFileSync(0, "utf8");
const output = solve(input);
if (output.length > 0) {
  process.stdout.write(output);
}
