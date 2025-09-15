function canBeTypedWords(text: string, brokenLetters: string): number {
  return text
    .split(" ")
    .filter((word) =>
      brokenLetters.split("").every((chr) => !word.includes(chr)),
    ).length;
}

canBeTypedWords("hello world", "ad");
