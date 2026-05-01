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
        idx += 1
        arr = data[idx : idx + n]
        idx += n

        stack: list[int] = []
        base = 0
        for x in arr:
            if stack and stack[-1] == x:
                stack.pop()
                base += 1
            else:
                stack.append(x)

        if not stack:
            answers.append(str(base))
            continue

        m = len(stack)
        d1 = [0] * m
        left = 0
        right = -1
        best = 1

        for i in range(m):
            if i > right:
                k = 1
            else:
                mirror = left + right - i
                k = min(d1[mirror], right - i + 1)

            while i - k >= 0 and i + k < m and stack[i - k] == stack[i + k]:
                k += 1

            d1[i] = k
            if k > best:
                best = k
            if i + k - 1 > right:
                left = i - k + 1
                right = i + k - 1

        answers.append(str(base + best))

    sys.stdout.write("\n".join(answers))


if __name__ == "__main__":
    solve()
