class Solution {
  grid: number[][] = [];
  stampHeight = 0;
  stampWidth = 0;
  m = 0;
  n = 0;
  preSum: number[][] = [];
  diffArr: number[][] = [];

  possibleToStamp(
    grid: number[][],
    stampHeight: number,
    stampWidth: number,
  ): boolean {
    this.grid = grid;
    this.stampHeight = stampHeight;
    this.stampWidth = stampWidth;
    this.m = this.grid.length;
    this.n = this.grid[0].length;
    this.setPreSum();
    console.log(this.preSum);
    this.setDiffArr();
    console.log(this.diffArr);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.diffArr[i + 1][j + 1] +=
          this.diffArr[i + 1][j] + this.diffArr[i][j + 1] - this.diffArr[i][j];
        if (this.grid[i][j] === 0 && this.diffArr[i + 1][j + 1] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  setPreSum() {
    this.preSum = Array.from({ length: this.m + 1 }, () =>
      new Array<number>(this.n + 1).fill(0),
    );

    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.preSum[i + 1][j + 1] =
          this.preSum[i + 1][j] +
          this.preSum[i][j + 1] -
          this.preSum[i][j] +
          this.grid[i][j];
      }
    }
  }

  setDiffArr() {
    this.diffArr = Array.from({ length: this.m + 2 }, () =>
      Array.from({ length: this.n + 2 }, () => 0),
    );
    for (let i2 = this.stampHeight; i2 <= this.m; i2++) {
      for (let j2 = this.stampWidth; j2 <= this.n; j2++) {
        const i1 = i2 - this.stampHeight + 1;
        const j1 = j2 - this.stampWidth + 1;
        if (
          this.preSum[i2][j2] ===
          this.preSum[i2][j1 - 1] +
            this.preSum[i1 - 1][j2] -
            this.preSum[i1 - 1][j1 - 1]
        ) {
          this.diffArr[i1][j1]++;
          this.diffArr[i1][j2 + 1]--;
          this.diffArr[i2 + 1][j1]--;
          this.diffArr[i2 + 1][j2 + 1]++;
        }
      }
    }
  }
}

const _ = new Solution();
const possibleToStamp = _.possibleToStamp.bind(_);

const grid = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
];
const stampHeight = 4;
const stampWidth = 3;
const ans = possibleToStamp(grid, stampHeight, stampWidth);
console.log(ans);

export default possibleToStamp;
