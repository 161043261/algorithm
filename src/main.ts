function isLongPressedName(name: string, typed: string): boolean {
  const nameCnt: number[] = [];
  const nameChr: string[] = [];
  for (let l = 0, r = 0; l <= r && r < name.length; ) {
    while (r < name.length && name[r] === name[l]) {
      r++;
    }
    nameCnt.push(r - l);
    nameChr.push(name[l]);
    l = r;
  }
  const typedCnt: number[] = [];
  const typedChr: string[] = [];
  for (let l = 0, r = 0; l <= r && r < typed.length; ) {
    while (r < typed.length && typed[r] === typed[l]) {
      r++;
    }
    typedCnt.push(r - l);
    typedChr.push(typed[l]);
    l = r;
  }

  if (nameCnt.length !== typedCnt.length) {
    return false;
  }

  for (let i = 0; i < nameCnt.length; i++) {
    if (nameCnt[i] > typedCnt[i] || nameChr[i] !== typedChr[i]) {
      return false;
    }
  }
  return true;
}

isLongPressedName("alex", "aaleex");
