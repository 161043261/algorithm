import bisect
import sys


def solve() -> None:
    data = list(map(int, sys.stdin.buffer.read().split()))
    if not data:
        return

    t = data[0]
    idx = 1
    answers = []

    for _ in range(t):
        n = data[idx]
        m = data[idx + 1]
        idx += 2

        prefix = [0] * (n + 1)
        for i in range(1, n + 1):
            prefix[i] = prefix[i - 1] + data[idx]
            idx += 1

        intervals = []
        for _ in range(m):
            left = data[idx]
            right = data[idx + 1]
            idx += 2
            weight = prefix[right] - prefix[left - 1]
            intervals.append((right, left, weight))

        intervals.sort()
        ends = [r for r, _, _ in intervals]
        dp = [0] * (m + 1)

        for i, (_, left, weight) in enumerate(intervals, start=1):
            prev = bisect.bisect_left(ends, left)
            dp[i] = max(dp[i - 1], dp[prev] + weight)

        answers.append(str(dp[m]))

    sys.stdout.write("\n".join(answers))


if __name__ == "__main__":
    solve()
