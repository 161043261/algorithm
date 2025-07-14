//! Symbol 值是唯一的
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false

const aaa = Symbol("abc");
const bbb = Symbol("abc");
const ccc = Symbol.for("abc");
const ddd = Symbol.for("abc");

console.log(aaa === bbb); // false
console.log(aaa === ccc, bbb === ccc); // false, false
console.log(ccc === ddd); // true

//! Symbol 值作为对象属性的键
const obj = {
  [aaa]: "Alice",
  [bbb]: "Bob",
  age: 23,
  name: "whoami",
};

console.log(obj[aaa]);
console.log(obj[bbb]);

// for...in, Object.keys(), Object.getOwnPropertyNames(), JSON.stringify()
// 获取不到 Symbol 值定义的属性
for (const key in obj) {
  console.log(key); // age name
}

// Object.getOwnPropertyNames(), Reflect.ownKeys()
// 获取的到 Symbol 值定义的属性
console.log(Object.keys(obj)); // [ "age", "name" ]
console.log(Object.getOwnPropertyNames(obj)); // [ "age", "name" ]
console.log(JSON.stringify(obj)); // {"age":23,"name":"whoami"}

console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(abc), Symbol(abc) ]
console.log(Reflect.ownKeys(obj)); // [("age", "name", Symbol(abc), Symbol(abc)) ]

const arr = [1, 2, 3];
const retIterUnbound = arr[Symbol.iterator];
const retIter = retIterUnbound.bind(arr);
const iter = retIter();
console.log(iter);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

const iter2 = arr[Symbol.iterator]();
console.log(iter2);

console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());

const nums = new Set([1, 2, 3]);
const iter3 = nums[Symbol.iterator]();
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());

//! for...of 是 iterator 的语法糖
//! 数组解构也是通过迭代器

const obj2 = {
  max: 5,
  cur: 0,
  [Symbol.iterator]() {
    return {
      max: this.max,
      cur: this.cur,
      next() {
        if (this.cur === this.max) {
          return {
            value: undefined,
            done: true,
          };
        } else {
          return {
            value: this.cur++,
            done: false,
          };
        }
      },
    };
  },
};
console.log([...obj2]); // [0, 1, 2, 3, 4]
for (let val of obj2) {
  console.log(val); // 0 1 2 3 4
}
