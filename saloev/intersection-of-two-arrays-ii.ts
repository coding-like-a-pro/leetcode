const arrByVal = (arr: number[]): Map<number, number> =>
  arr.reduce((acc, number) => {
    const count = acc.has(number) ? acc.get(number) + 1 : 1;
    acc.set(number, count);
    return acc;
  }, new Map());

function intersect(nums1: number[], nums2: number[]): number[] {
  const [nums1Count, nums2Count] = [nums1, nums2].map(arrByVal);

  const res = [];
  nums1Count.forEach((value: number, key: number) => {
    if (nums2Count.has(key)) {
      const count = Math.min(nums2Count.get(key), value);
      for (let i = 0; i < count; i += 1) {
        res.push(key);
      }
    }
  });
  return res;
}
