function lexicalOrder(n: number): number[] {
  return Array.from({ length: n }, (_, idx) => idx)
    .map(String)
    .sort()
    .map(Number);
}

lexicalOrder(1);
