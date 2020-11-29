function maxPower(s: string): number {
  let currentCharCount = 0;
  let currentChar = s[0];
  let res = 1;

  for (const char of s) {
    if (char === currentChar) {
      currentCharCount += 1;
    } else {
      currentChar = char;
      res = Math.max(res, currentCharCount);
      currentCharCount = 1;
    }
  }

  return Math.max(res, currentCharCount);
}
