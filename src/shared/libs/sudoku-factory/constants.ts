import { SudokuLevel } from './types';

export const SIZE = 9 as const;
export const ALLOWED_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const PERCENTAGE: Record<SudokuLevel, number> = {
  easy: 0.15,
  medium: 0.3,
  hard: 0.4,
  expert: 0.5,
  evil: 0.6,
};
