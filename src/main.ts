function nextBeautifulNumber(n: number): number {
  const getNumChr2cnt = (num: number) => {
    const numChr2cnt = new Map<string, number>();
    const numStr = String(num);
    for (const numChr of numStr) {
      numChr2cnt.set(numChr, (numChr2cnt.get(numChr) ?? 0) + 1);
    }
    return numChr2cnt;
  };
  for (let i = n + 1; i <= 122444; i++) {
    const numChr2cnt = getNumChr2cnt(i);
    if (
      Array.from(numChr2cnt.keys()).every((numChr) => {
        return (numChr2cnt.get(numChr) ?? 0) == Number(numChr);
      })
    ) {
      return i;
    }
  }
  return 0;
}

export default nextBeautifulNumber
