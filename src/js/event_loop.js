// 异步任务分为宏任务和微任务
// 宏任务: <script> 整体代码, setTimeout, setInterval, I/O 操作 (XMLHttpRequest, fetch, postMessage), requestAnimationFrame
// 微任务: Promise[.then, .catch, .finally], MutationObserver, process.nextTick

// 先执行一个宏任务, 再执行当前宏任务的微任务, 然后进入下一个事件循环

Promise.resolve()
  .then(() => console.log(0))
  .then(() => console.log(1));

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
  Promise.resolve().then(() => console.log(4));
});

setTimeout(() => {
  console.log(5);
  Promise.resolve()
    .then(() => console.log(6))
    .then(() => console.log(7));
}, 0);

Promise.resolve()
  .then(() => console.log(8))
  .then(() => console.log(9));
console.log(10);

// 10 0 8 1 9 2 3 4 5 6 7

export default {}
