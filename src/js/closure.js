// 1s 后打印 333
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// 方法 1, 1s 后打印 012
for (var i2 = 0; i2 < 3; i2++) {
  (function (j2) {
    setTimeout(() => {
      console.log(j2);
    }, 1000);
  })(i2);
}

// 方法 2, 1s 后打印 012
for (var i3 = 0; i3 < 3; i3++) {
  // setTimeout 的第三个参数, 将作为第一个参数 callback 的参数
  setTimeout(
    (j3) => {
      console.log(j3);
    },
    1000,
    i3,
  );
}

// 方法 3, 1s 后打印 0, 2s 后打印 1, 3s 后打印 2
for (var i4 = 0; i4 < 3; i4++) {
  setTimeout(
    (j4) => {
      console.log(j4);
    },
    1000 * i4,
    i4,
  );
}

export default {};
