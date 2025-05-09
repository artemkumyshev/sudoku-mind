type FixedLengthArray<
  T,
  L extends number,
  R extends T[] = [],
> = R['length'] extends L ? R : FixedLengthArray<T, L, [T, ...R]>;

export type SudokuCell = {
  value: number | null;
  answer: number | null;
  block: number;
  isVisible: boolean;
};
export type SudokuRow = FixedLengthArray<SudokuCell, 9>;
export type SudokuGrid = FixedLengthArray<SudokuRow, 9>;

export type SudokuLevel = 'easy' | 'medium' | 'hard' | 'expert' | 'evil';

export type SudokuAnswer = {
  row: number;
  col: number;
  answer: number;
};
export type SudokuCellSelect = { row: number; col: number; block: number };
