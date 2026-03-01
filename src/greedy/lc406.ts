function reconstructQueue(people: number[][]): number[][] {
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });
  const ans = [people[0]];
  for (let i = 1; i < people.length; i++) {
    ans.splice(people[i][1], 0, people[i]);
  }
  return ans;
}

export default reconstructQueue;
