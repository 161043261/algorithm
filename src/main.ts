/* eslint-disable @typescript-eslint/no-unused-vars */
function readBinaryWatch(turnedOn: number): string[] {
  const ans: string[] = [];
  for (let h = 0; h < 12; h++) {
    for (let m = 0; m < 60; m++) {
      if (countBits(h) + countBits(m) === turnedOn) {
        ans.push(`${h}:${m.toString().padStart(2, "0")}`);
      }
    }
  }
  return ans;
}

function countBits(num: number): number {
  let count = 0;
  let n = num;
  while (n > 0) {
    n = n & (n - 1);
    count++;
  }
  return count;
}
