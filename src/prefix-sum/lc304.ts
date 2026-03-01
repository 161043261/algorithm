class NumMatrix {
  matrix: number[][];
  m: number;
  n: number;
  preSum: number[][];

  constructor(matrix: number[][]) {
    this.matrix = matrix;
    this.m = this.matrix.length;
    this.n = this.matrix[0].length;
    this.preSum = Array.from({ length: this.m + 1 }, () =>
      Array.from({ length: this.n + 1 }, () => 0),
    );
    this.setPreSum();
  }

  setPreSum() {
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.preSum[i + 1][j + 1] =
          this.preSum[i + 1][j] +
          this.preSum[i][j + 1] -
          this.preSum[i][j] +
          this.matrix[i][j];
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    return (
      this.preSum[row2 + 1][col2 + 1] -
      this.preSum[row2 + 1][col1] -
      this.preSum[row1][col2 + 1] +
      this.preSum[row1][col1]
    );
  }
}

export default NumMatrix;
