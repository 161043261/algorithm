/**
 *
 * @param {Array<function>} fnList
 */
function compose(fnList) {
  const initialFn = fnList.shift();

  return function (...args) {
    return fnList.reduce(
      (pre, cur) => {
        return pre.then((value) => {
          return cur.call(null, value);
        });
      },

      Promise.resolve(initialFn.call(null, ...args)),
    );
  };
}

function syncFn1(arg) {
  console.log("syncFn1");
  return arg + 1;
}

function syncFn2(arg) {
  console.log("syncFn2");
  return arg + 2;
}

function syncFn3(arg) {
  console.log("syncFn3");
  return arg + 3;
}

const asyncComposedFn = compose([syncFn1, syncFn2, syncFn3]);
// syncFn1 -> syncFn2 -> syncFn3 -> 6
asyncComposedFn(0).then(console.log);

function asyncFn1(arg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("asyncFn1");
      resolve(arg + 1);
    }, 3000);
  });
}

function asyncFn2(arg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("asyncFn2");
      resolve(arg + 2);
    }, 3000);
  });
}

function asyncFn3(arg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("asyncFn3");
      resolve(arg + 3);
    }, 3000);
  });
}

const asyncComposedFn2 = compose([asyncFn1, asyncFn2, asyncFn3]);
// asyncFn1 -> asyncFn2 -> asyncFn3 -> 10
asyncComposedFn2(4).then(console.log);
