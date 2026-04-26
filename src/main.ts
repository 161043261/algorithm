function judgeCircle(moves: string): boolean {
  const r = moves.split("").filter((item) => item === "R").length;
  const l = moves.split("").filter((item) => item === "L").length;
  const u = moves.split("").filter((item) => item === "U").length;
  const d = moves.split("").filter((item) => item === "D").length;
  return r === l && u === d;
}
