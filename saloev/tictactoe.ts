const GRID_SIZE = 3;
const PLAYERS = ["A", "B"];
const STATUS_DRAW = 'Draw';
const STATUS_MOVEMENTS = 'Pending';

const sumRow = (grid: string[][]): string[] => {
    return grid.map((row) => row.reduce((acc, val) => acc + val, ''));
}

const sumMainAndAdditionalDiagonal = (grid: string[][]): string[] => {
    return grid.reduce((acc, arr, index) => {
        const [mainDiagonal, antidiogonal] = [arr[index], arr[arr.length - index - 1]];
        acc[0] = acc[0] + mainDiagonal;
        acc[1] = acc[1] + antidiogonal;
        return acc;
  }, ['', '']);
}

const transpose = (grid: string[][]): string[][] => {
    return grid.map((row, i) => row.map((_, j) => grid[j][i]));
};

const winner = (grid: string[][]): string | null => {
    const sumRows = [...sumRow(grid), ...sumRow(transpose(grid)), ...sumMainAndAdditionalDiagonal(grid)];
    const regexp = `^(${PLAYERS.map(player => player + `{${GRID_SIZE}}`).join("|")})$`;
    const findWinner = sumRows.find((str) => new RegExp(regexp).exec(str));
    return findWinner ? findWinner[0] : null;
};

const draw = (grid: string[][]): string | null => {
    const isDraw = grid.every(row => row.every((val) => val !== ''));
    return isDraw ? STATUS_DRAW : null;
}


function tictactoe(moves: number[][]): string {
    const grid = Array(GRID_SIZE).fill("").map(() => Array(GRID_SIZE).fill(""));
    
    moves.forEach((row, i) => {
        const [x, y] = row;
        grid[x][y] = PLAYERS[i % PLAYERS.length];
    });

    const winnerOrDraw = [winner, draw].map((func) => func(grid)).find(val => !!val);    
    
    return winnerOrDraw || STATUS_MOVEMENTS;
};