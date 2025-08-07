//! new Array(length).fill(itemVal)
const arr: number[][] = new Array(3).fill([5, 2, 8]);
console.log(arr); // [ [ 5, 2, 8 ], [ 5, 2, 8 ], [ 5, 2, 8 ] ]
arr[1][2] = 0;
console.log(arr); // [ [ 5, 2, 0 ], [ 5, 2, 0 ], [ 5, 2, 0 ] ]

//! Array.from({ length }).map((itemVal, idx) => newItemVal)
const arr2: number[][] = Array.from({ length: 3 }).map((item, idx) => {
  // undefined 0
  // undefined 1
  // undefined 2
  console.log(item, idx);
  return [5, 2, 8];
});
console.log(arr2); // [ [ 5, 2, 8 ], [ 5, 2, 8 ], [ 5, 2, 8 ] ]
arr2[1][2] = 0;
console.log(arr2); // [ [ 5, 2, 8 ], [ 5, 2, 0 ], [ 5, 2, 8 ] ]

//! Array.from({ length }, (itemVal, idx) => newItemVal)
const arr3: number[][] = Array.from({ length: 3 }, (item, idx) => {
  // undefined 0
  // undefined 1
  // undefined 2
  console.log(item, idx);
  return [5, 2, 8];
});
console.log(arr3); // [ [ 5, 2, 8 ], [ 5, 2, 8 ], [ 5, 2, 8 ] ]
arr3[1][2] = 0;
console.log(arr3); // [ [ 5, 2, 8 ], [ 5, 2, 0 ], [ 5, 2, 8 ] ]
