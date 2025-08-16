const promiseInst = new Promise((resolve, reject) => {
  setTimeout(() => {
    const rand = Math.random();
    console.log("rand:", rand.toFixed(2));

    if (rand > 0.5) {
      resolve("Let's fall in love");
    } else {
      reject("You're a good person");
    }
  }, 3000);
});

promiseInst.then(
  // onFulfilled
  (value) => {
    console.log("[onFulfilled] value:", value);
  },

  // onRejected
  (reason) => {
    console.log("[onRejected] reason:", reason);
  },
);

new Promise((resolve, reject) => {
  setTimeout(() => {
    const rand = Math.random();
    console.log("rand:", rand.toFixed(2));

    if (rand > 0.5) {
      resolve("Let's fall in love");
    } else {
      reject("You're a good person");
    }
  }, 3000);
})

  // onFulfilled
  .then((value) => {
    console.log("[onFulfilled] value:", value);
  })

  // onRejected
  .catch((reason) => {
    console.log("[onRejected] reason:", reason);
  });
