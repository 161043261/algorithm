from typing import Callable, List, Set


def conflict(
    row: int, col: int, usedColIdx: Set[int], rowAddCol: Set[int], rowSubCol: Set[int]
) -> bool:
    return (col in usedColIdx) or ((row + col) in rowAddCol) or (row - col) in rowSubCol


class Solution:
    ans: List[List[str]]
    board: List[List[str]]
    usedColIdx: Set[int]
    rowAddCol: Set[int]
    rowSubCol: Set[int]
    n: int

    def solveNQueens(self, n: int) -> List[List[str]]:
        self.ans = []
        self.board = [["." for _ in range(n)] for _ in range(n)]
        self.usedColIdx = set()
        self.rowAddCol = set()
        self.rowSubCol = set()
        self.n = n

        self.backtrack(0, conflict)

        return self.ans

    def backtrack(
        self,
        row: int,
        conflict: Callable[[int, int, Set[int], Set[int], Set[int]], bool],
    ):
        if row == self.n:
            self.ans.append(["".join(item) for item in self.board])
            return

        for col in range(0, self.n):
            if conflict(row, col, self.usedColIdx, self.rowAddCol, self.rowSubCol):
                continue

            self.board[row][col] = "Q"
            self.usedColIdx.add(col)
            self.rowAddCol.add(row + col)
            self.rowSubCol.add(row - col)

            self.backtrack(row + 1, conflict)

            self.board[row][col] = "."
            self.usedColIdx.remove(col)
            self.rowAddCol.remove(row + col)
            self.rowSubCol.remove(row - col)
