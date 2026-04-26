import sys


def max_extra_pairs(reduced: list[int]) -> int:
    length = len(reduced)
    if length == 0:
        return 0

    # Linear-time odd palindrome radii on an integer array.
    # d1[i] counts the radius including the center itself.
    d1 = [0] * length
    left = 0
    right = -1
    best = 0

    for i in range(length):
        if i > right:
            radius = 1
        else:
            mirror = left + right - i
            radius = min(d1[mirror], right - i + 1)

        while (
            i - radius >= 0
            and i + radius < length
            and reduced[i - radius] == reduced[i + radius]
        ):
            radius += 1

        d1[i] = radius
        best = max(best, radius - 1)

        if i + radius - 1 > right:
            left = i - radius + 1
            right = i + radius - 1

    return best + 1


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
        stack: list[int] = []

        for _ in range(n):
            value = data[idx]
            idx += 1
            if stack and stack[-1] == value:
                stack.pop()
            else:
                stack.append(value)

        reduced_len = len(stack)
        removed_pairs = (n - reduced_len) // 2
        answer = removed_pairs + max_extra_pairs(stack)
        answers.append(str(answer))

    sys.stdout.write("\n".join(answers))


if __name__ == "__main__":
    solve()
