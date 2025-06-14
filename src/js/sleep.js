/* eslint-disable @typescript-eslint/no-unused-vars */

function sleep(fn, delay) {
  setTimeout(fn, delay);
}

function sleep2(fn, delay) {
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  }).then(fn);
}

async function sleep3(fn, delay) {
  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
  fn();
}

function fn(a, b, c, d) {
  console.log(a + b + c + d);
}

const boundFn = fn.bind(undefined, 1, 2, 3, 4);

sleep(boundFn, 3000); // 10
sleep2(boundFn, 6000); // 10
sleep3(boundFn, 9000); // 10

export default {};
