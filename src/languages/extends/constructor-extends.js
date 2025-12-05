// 构造函数继承 Constructor Extends

// 子类构造函数中, 通过 apply 或 call 调用父类构造函数
// 缺点:
// 无法继承父类原型上的方法

function Parent(name) {
  this.name = name;
  this.hobbies = ["reading"];
}

Parent.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  // 子类构造函数中, 通过 apply 或 call 调用父类构造函数
  // Parent.apply(this, [name]);
  Parent.call(this, name);
  this.age = age;
}

const child = new Child("Alice", 23);
const child2 = new Child("Bob", 24);

child.name = "Cook";
console.log(child.name); // Cook
console.log(child2.name); // Bob

child2.hobbies.push("coding");
console.log(child.hobbies); // [ 'reading' ]
console.log(child2.hobbies); // [ 'reading', 'coding' ]

// 无法继承父类原型上的方法
console.log(child.getName?.()); // undefined
console.log(child2.getName?.()); // undefined
