function imageSmoother(M: number[][]): number[][] {
  const surroundingCells = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return M.map((row, index) => {
    return row.map((_, cellIndex) => {
      const surroundingIndex = surroundingCells
        .map(([x, y]) => [x + index, y + cellIndex])
        .filter(([x, y]) => {
          return M[x] && M[x][y] !== undefined;
        });
      const sum = surroundingIndex.reduce((acc, [x, y]) => acc + M[x][y], 0);
      return Math.floor(sum / surroundingIndex.length);
    });
  });
}
