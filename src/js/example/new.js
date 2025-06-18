function Obj() {
  this.a = 1;
  this.b = 2;
}
const obj = new Obj();
console.log("obj", obj); // obj Obj { a: 1, b: 2 }

function Obj2() {
  this.a = 1;
  this.b = 2;
  return { a: 3, b: 4 };
}
const obj2 = new Obj2();
console.log("obj2", obj2); // obj2 { a: 3, b: 4 }

function new_(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError();
  }
  const ctx = Object.create(fn.prototype);
  const ret = fn.apply(ctx, args);
  return (typeof ret === "object" && ret !== null) || typeof ret === "function"
    ? ret
    : ctx;
}

function People(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

People.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

const p1 = new People("Genshin", "Impact");
const p2 = new_(People, "Genshin", "Impact");
console.log("p1", p1, p1.getFullName());
console.log("p2", p2, p2.getFullName());

export default {};
