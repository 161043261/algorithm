function instanceOf(obj, fn) {
  const proto = Object.getPrototypeOf(obj);
  if (!proto) return false;

  if (proto === fn.prototype) {
    //! Object.getPrototypeOf(obj) === fn.prototype
    return true;
  } else {
    return instanceOf(proto, fn);
  }
}

class Animal {}
class Cat extends Animal {}
const cat = new Cat();
console.log(instanceOf(cat, Animal)); // true

function Animal2() {}
function Cat2() {}

Cat2.prototype = Object.create(Animal2.prototype);
Cat2.prototype.constructor = Cat2;
//! 继承父类的静态属性和静态方法
Object.setPrototypeOf(Cat, Animal);

const cat2 = new Cat2();
console.log(instanceOf(cat2, Animal2)); // true

console.log(instanceOf(cat, Animal2)); // false
console.log(instanceOf(cat2, Animal)); // false

export default {};
