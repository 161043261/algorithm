function concurrent(asyncFnList, num /* 最大并发数 */) {
  let idleNum = num;

  const executor = () => {
    while (idleNum > 0 && asyncFnList.length > 0) {
      const fn = asyncFnList.shift();
      idleNum--;
      fn().finally(() => {
        idleNum++;
        executor();
      });
    }
  };
  executor();
}

function genAsyncFn(idx, delay) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(idx);
        resolve();
      }, delay);
    });
}

concurrent(
  [
    genAsyncFn(1, 3000),
    genAsyncFn(2, 3000),
    genAsyncFn(3, 3000),
    genAsyncFn(4, 3000),
    genAsyncFn(5, 3000),
  ],
  2, // num
);

export default {};
