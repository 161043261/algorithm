/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

let wrappedBool: Boolean = new Boolean(1);
let wrappedBool2: Boolean = Boolean(1);

let u: undefined = undefined;
let u2: void = undefined;
let n: null = null;

let s = "str";

interface Person {
  readonly [prop: string]: unknown;
}

interface NumArr {
  [idx: number]: number;
}
let fib: NumArr = [1, 1, 2];

function fn(...args: unknown[]) {
  let args2: IArguments = arguments;
  const args3 = Array.from(args2);
}

fn(1, 2, 3);

// 可选参数
const fn2 = (age: number, name?: string) => age + (name ?? "whoami");
// 参数默认值
const fn3 = (age: number, name: string = "whoami") => age + name;

// 接口定义函数
interface Add {
  (a: number, b: number): number;
}
const fn4: Add = (a, b) => a + b;

interface People {
  age: number;
}
interface Worker {
  job: string;
}
//「与」类型
let pw: People & Worker = { age: 23, job: "develop" };

// 字面量
let a1: readonly [1, 2] = [1, 2] as const;
// a1.unshift(3);
let a2 = [1, 2];
a2.unshift(3);

// Boolean, Number, String, RegExp, Date, Error

class Susan {
  public name: string = "Susan";
  private age: number = 22; // 本类可访问
  protected money: null = null; // 本类和继承的子类可访问
  static cnt = 0;
  constructor() {
    Susan.cnt += 1;
  }
  static getCnt() {
    console.log(this === Susan);
    return this.cnt + Susan.cnt;
  }
}

// 元组支持自定义名字、支持可选
let xy: [x: number, y?: boolean] = [1];
let xy2: [x: number, y?: boolean] = [1, false];

enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}

enum Color2 {
  Red = 3, // 3
  Green, // 4
  Blue, //5
}

enum Color3 {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

// 枚举, 编译为 IIFE
enum Flag {
  Yes = 1,
  No = "No",
}

// 常量枚举, 编译后丢弃 Flag2, 将 Flag2.Yes, Flag.No 全部内联
const enum Flag2 {
  Yes = 111,
  No = "Noop",
}
// console.log(111 /* Flag2.Yes */, "Noop" /* Flag2.No */);
console.log(Flag2.Yes, Flag2.No);

// type 类型别名
type str = string;
