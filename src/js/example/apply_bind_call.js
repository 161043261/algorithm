Function.prototype.call_ = function (ctx, ...args) {
  if (ctx === undefined || ctx === null) {
    ctx = globalThis;
  }
  const fn = Symbol(); // 唯一 key 值
  ctx[fn] = this;
  const ret = ctx[fn](...args);
  delete ctx[fn];
  return ret;
};

Function.prototype.apply_ = function (ctx, args) {
  if (ctx === undefined || ctx === null) {
    ctx = globalThis;
  }
  const fn = Symbol(); // 唯一 key 值
  ctx[fn] = this;
  const ret = ctx[fn](...args);
  delete ctx[fn];
  return ret;
};

Function.prototype.bind_ = function (ctx, ...args) {
  if (ctx === undefined || ctx === null) {
    ctx = globalThis;
  }
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const calleeOrConstructor = this;
  const fn = Symbol();
  const boundFn = function (...args2) {
    // 如果使用 new 调用
    if (this instanceof calleeOrConstructor) {
      // Constructor
      this[fn] = calleeOrConstructor;
      const ret = this[fn](...args, ...args2);
      delete this[fn];
      return ret;
    } else {
      // callee
      ctx[fn] = calleeOrConstructor;
      const ret = ctx[fn](...args, ...args2);
      delete ctx[fn];
      return ret;
    }
  };
  boundFn.prototype = Object.create(calleeOrConstructor.prototype);
  return boundFn;
};

function add(...args) {
  return this.a + this.b + args.reduce((a, b) => a + b);
}

const obj = { a: 1, b: 2 };
const ret = add.call_(obj, 3, 4);
console.log("ret", ret); // ret 10

const ret2 = add.apply_(obj, [3, 4]);
console.log("ret2", ret2); // ret2 10

const boundAdd = add.bind_(obj, 3, 4);
const ret3 = boundAdd(5, 6);
console.log("ret3", ret3); // ret3 21

function Args(...args) {
  this.arr = args;
}

const BoundArgs = Args.bind_(obj, 1, 2);

const args = new BoundArgs(3, 4);
console.log(args); // Args { arr: [ 1, 2, 3, 4 ] }

export default {};
