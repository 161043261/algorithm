// 异步任务分为宏任务和微任务
// 宏任务: <script> 整体代码, setTimeout, setInterval, I/O 操作 (XMLHttpRequest, fetch, postMessage), requestAnimationFrame
// 微任务: Promise[.then, .catch, .finally], MutationObserver, process.nextTick

// 先执行一个宏任务, 再执行当前宏任务的微任务, 然后进入下一个事件循环

console.log(0);

async function fn() {
  await fn2();
  console.log(1);
}

async function fn2() {
  console.log(2); //! sync
  new Promise(() => console.log(3) /* sync */);
}

fn(); // new Promise(...)
setTimeout(() => console.log(4), 0);

new Promise((resolve) => {
  new Promise(() => console.log(5) /* sync */);
  console.log(6); //! sync
  resolve();
})
  .then(() => {
    console.log(7);
  })
  .then(() => {
    console.log(8);
  });

console.log(9);

// 0 2 3 5 6 9 1 7 8 4
