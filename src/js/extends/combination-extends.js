// 组合继承 Combination Extends
// 结合原型链继承 Prototype Extends 和构造函数继承 Constructor Extends 的优点
// 使用构造函数继承父类的实例属性
// 使用原型链继承父类原型上的方法

// 缺点:
// 父类构造函数会被调用 2 次

function Parent(name) {
  this.name = name;
  this.hobbies = ["reading"];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  // 使用构造函数继承父类的实例属性
  Parent.call(this, name); // 父类构造函数会被调用 2 次
  this.age = age;
}

// 使用原型链继承父类原型上的方法
Child.prototype = new Parent(); // 父类构造函数会被调用 2 次
Child.prototype.constructor = Child;

const child = new Child("Alice", 23);
const child2 = new Child("Bob", 24);

child.name = "Cook";
console.log(child.name); // Cook
console.log(child2.name); // Bob

child2.hobbies.push("coding");
console.log(child.hobbies); // [ 'reading' ]
console.log(child2.hobbies); // [ 'reading', 'coding' ]

console.log(child.getName()); // Cook
console.log(child2.getName()); // Bob
