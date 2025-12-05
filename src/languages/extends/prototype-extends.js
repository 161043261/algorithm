// 原型链继承 Prototype Extends

// 子类构造函数的原型指向父类实例
// 缺点:
// 创建子类实例时, 无法向父类构造函数传递参数
// 父类的实例属性被所有子类共享, 如果是引用类型, 则一个实例修改会影响到其他实例

function Parent(name) {
  this.name = name;
  this.hobbies = ["reading"];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(age) {
  this.age = age;
}

// 子类构造函数的原型指向父类实例
// 创建子类实例时, 无法向父类构造函数传递参数
Child.prototype = new Parent("Parent");
Child.prototype.constructor = Child;

const child = new Child(23);
const child2 = new Child(24);

child.name = "Alice";
console.log(child.name); // Alice
console.log(child2.name); // Parent

// 父类的实例属性被所有子类共享, 如果是引用类型, 则一个实例修改会影响到其他实例
child2.hobbies.push("coding");
console.log(child.hobbies); // [ 'reading', 'coding' ]
console.log(child2.hobbies); // [ 'reading', 'coding' ]

console.log(child.getName()); // Alice
console.log(child2.getName()); // Parent
