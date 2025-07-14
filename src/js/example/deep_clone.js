function deepClone(target, target2clone = new WeakMap()) {
  const isObject = (target_) => typeof target_ === "object" && target_ !== null;
  if (!isObject(target)) {
    return target;
  }
  if (target2clone.get(target)) {
    return target2clone.get(target);
  }
  // let clonedObj = Object.create(Object.getPrototypeOf(target));
  let clonedObj = Array.isArray(target)
    ? []
    : Object.create(Object.getPrototypeOf(target));
  target2clone.set(target, clonedObj);

  console.log(Reflect.ownKeys(target));
  // Reflect.ownKeys 不包括原型属性
  for (const key of Reflect.ownKeys(target)) {
    if (isObject(target[key])) {
      clonedObj[key] = deepClone(target[key], target2clone);
    } else {
      clonedObj[key] = target[key];
    }
  }
  return clonedObj;
}

const clonedArr = deepClone([1, [2, 3]]);
console.log(clonedArr);
const clonedObj = deepClone({ a: 1, b: { c: 4 } });
console.log(clonedObj);

export default {};
