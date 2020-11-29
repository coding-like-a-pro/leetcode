function maxPower(s: string): number {
  let currentCharCount = 0;
  let previousCharCount = 0;
  let currentChar = s[0];
  let res = 1;

  const lastMax = () => Math.max(previousCharCount, currentCharCount);

  for (const char of s) {
    if (char === currentChar) {
      currentCharCount += 1;
    } else {
      currentChar = char;
      res = Math.max(res, lastMax());
      previousCharCount = currentCharCount;
      currentCharCount = 1;
    }
  }

  return Math.max(res, lastMax());
}
