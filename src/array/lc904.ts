function totalFruit(fruits: number[]): number {
  const fruitTypes: number[] = [];
  let ans = 0;
  let l = 0;
  let r = 0;

  while (l <= r && r < fruits.length) {
    while (r < fruits.length) {
      if (fruitTypes.length < 2) {
        fruitTypes.push(fruits[r]);
        r++;
        continue;
      }

      if (
        fruitTypes.length == 2 &&
        (fruits[r] === fruitTypes[0] || fruits[r] === fruitTypes[1])
      ) {
        r++;
      } else {
        break;
      }
    }

    ans = Math.max(ans, r - l);

    if (r >= fruits.length) {
      break;
    }

    let i = r - 1;
    while (fruits[i] === fruits[r - 1]) {
      i--;
    }

    l = i + 1;

    if (fruitTypes[0] === fruits[i]) {
      fruitTypes.splice(0, 1);
    } else {
      // fruitTypes[1] === fruits[i]
      fruitTypes.splice(1, 1);
    }
  }

  return ans;
}

export default totalFruit;
