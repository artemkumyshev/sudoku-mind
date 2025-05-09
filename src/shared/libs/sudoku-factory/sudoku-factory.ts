import { ALLOWED_NUMBERS, PERCENTAGE, SIZE } from './constants';
import { SudokuCell, SudokuGrid, SudokuLevel } from './types';

export function sudokuFactory(level: SudokuLevel): SudokuGrid {
  const grid = generateGrid();
  solve(grid, 0, 0);
  assignBlocks(grid);
  const totalToHide = Math.floor(SIZE * SIZE * PERCENTAGE[level]);
  hideCells(grid, totalToHide);

  return grid;
}

function generateGrid(): SudokuGrid {
  return Array.from({ length: SIZE }, () =>
    Array.from(
      { length: SIZE },
      (): SudokuCell => ({
        value: null,
        answer: null,
        block: 0,
        isVisible: true,
      }),
    ),
  ) as SudokuGrid;
}

function assignBlocks(grid: SudokuGrid): void {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const blockRow = Math.floor(i / 3);
      const blockCol = Math.floor(j / 3);
      grid[i][j].block = blockRow * 3 + blockCol;
    }
  }
}

function hideCells(grid: SudokuGrid, count: number) {
  while (count > 0) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    const cell = grid[row][col];

    if (cell.isVisible && cell.value !== 0) {
      cell.isVisible = false;
      count--;
    }
  }
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function isSafe(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (grid[row][i].value === num || grid[i][col].value === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j].value === num) {
        return false;
      }
    }
  }

  return true;
}

function solve(grid: SudokuGrid, row: number, col: number): boolean {
  if (row === SIZE) return true;

  const nextRow = col === SIZE - 1 ? row + 1 : row;
  const nextCol = col === SIZE - 1 ? 0 : col + 1;

  const numbers = shuffleArray([...ALLOWED_NUMBERS]);

  for (const num of numbers) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col].value = num;

      if (solve(grid, nextRow, nextCol)) return true;

      grid[row][col].value = 0; // backtrack
    }
  }

  return false;
}
