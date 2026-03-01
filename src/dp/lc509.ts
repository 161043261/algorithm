/**
 * Generator<TYield = unknown, TReturn = any, TNext = any>
 * - TYield: type of values yielded by the generator (via yield expression)
 * - TReturn: type of value returned when generator completes (via return statement)
 * - TNext: type of value that can be passed into generator via next(value)
 */

function* genFunc(): Generator<number> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function fib(n: number): number {
  const gen: Generator<number> = genFunc();
  let ans = 0;
  for (let i = 0; i <= n; i++) {
    const next: IteratorResult<number> = gen.next();
    ans = next.value;
  }
  return ans;
}

export default fib;
