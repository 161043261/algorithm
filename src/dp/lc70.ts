function climbStairs(n: number): number {
  const genFunc = function* () {
    let a = 1; // n = 1
    let b = 2; // n = 2
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  };

  const gen: Generator<number> = genFunc();
  let ans = 0;
  for (let i = 0; i <= n; i++) {
    const next = gen.next();
    ans = next.value;
  }
  return ans;
}

export default climbStairs;
