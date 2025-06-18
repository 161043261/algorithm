function Animal() {
  console.log("Construct animal");
  this.name = "Animal";
}

Animal.staticGetName = function () {
  console.log("Animal");
};

Animal.prototype.getName = function () {
  console.log(this.name);
};

function Cat() {
  Animal.call(this /* , ... */); // super()
  // Animal.apply(this, [])
  console.log("Construct cat");
  this.name = "Cat";
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
//! 继承父类的静态属性和静态方法
Object.setPrototypeOf(Cat, Animal);

console.log(Object.getPrototypeOf(Cat) === Animal); // true
console.log(Cat.__proto__ === Animal); // true

Cat.staticGetName(); // Animal
// Construct animal, Construct cat
const cat = new Cat();
cat.getName(); // Cat

export default {};
