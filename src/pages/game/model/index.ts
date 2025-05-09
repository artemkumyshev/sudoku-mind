import { createEffect, createEvent, createStore, sample } from 'effector';
import { pending, reset } from 'patronum';

import { atom } from '@/shared/libs/atom';
import {
  SudokuAnswer,
  SudokuCellSelect,
  sudokuFactory,
  SudokuGrid,
  SudokuLevel,
  SudokuRow,
} from '@/shared/libs/sudoku-factory';
import { $$level } from '@/shared/model/level';
import { routes } from '@/shared/router';

type Status = 'idle' | 'game' | 'win' | 'lost';

// Game Domain
export const $$game = atom(() => {
  const currentRoute = routes.game;

  // EFFECTS
  const requestSudokuCreateFx = createEffect(async (level: SudokuLevel) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return sudokuFactory(level);
  });

  // EVENTS
  const checked = createEvent();
  const restarted = createEvent();
  const mistakeHappened = createEvent<number>();
  const statusChanged = createEvent<Status>();
  const cellSelectChanged = createEvent<SudokuCellSelect>();
  const answerChanged = createEvent<SudokuAnswer>();

  // STORES
  const $status = createStore<Status>('idle').on(statusChanged, (_, payload) => payload);
  const $mistakes = createStore(0).on(mistakeHappened, (_, payload) => payload);
  const $grid = createStore<SudokuGrid | null>(null)
    .on(requestSudokuCreateFx.doneData, (_, payload) => payload)
    .on(requestSudokuCreateFx.fail, () => null)
    .on(answerChanged, (state, payload) => {
      if (!state) return state;
      return state.map((row, rowIndex) =>
        rowIndex === payload.row
          ? (row.map((cell, colIndex) =>
              colIndex === payload.col ? { ...cell, answer: payload.answer } : cell,
            ) as SudokuRow)
          : row,
      ) as SudokuGrid;
    });
  const $selectCell = createStore<SudokuCellSelect>({
    row: -1,
    col: -1,
    block: -1,
  })
    .on(cellSelectChanged, (_, payload) => payload)
    .reset(answerChanged);
  const $isInspectionReady = $grid.map((grid) =>
    grid ? !grid.flat().some((cell) => !cell.isVisible && cell.answer === null) : false,
  );
  const $isCreating = pending([requestSudokuCreateFx]).map((payload) => !payload);

  sample({
    clock: answerChanged,
    source: { grid: $grid, mistakes: $mistakes },
    fn: ({ grid, mistakes }, { row, col, answer }) => {
      if (!grid) return mistakes;

      const cell = grid[row][col];
      const isCorrect = cell.value === answer;

      return isCorrect ? mistakes : mistakes + 1;
    },
    target: mistakeHappened,
  });

  sample({
    clock: [currentRoute.opened, restarted],
    source: $$level.$level,
    target: requestSudokuCreateFx,
  });

  sample({
    clock: $mistakes,
    fn: (mistakes) => {
      return mistakes >= 5 ? 'lost' : 'game';
    },
    target: $status,
  });

  sample({
    clock: checked,
    source: {
      grid: $grid,
      mistakes: $mistakes,
    },
    fn: ({ grid, mistakes }) => {
      if (mistakes >= 5 || !grid) return 'lost';

      const hasErrors = grid.some((row) =>
        row.some((cell) => !cell.isVisible && typeof cell.answer === 'number' && cell.answer !== cell.value),
      );

      return hasErrors ? 'lost' : 'win';
    },
    target: $status,
  });

  reset({
    clock: [currentRoute.closed, restarted],
    target: [$status, $grid, $mistakes],
  });

  return {
    currentRoute,
    $status,
    $mistakes,
    $grid,
    $selectCell,
    $isInspectionReady,
    $isCreating,

    checked,
    restarted,
    mistakeHappened,
    statusChanged,
    cellSelectChanged,
    answerChanged,
  };
});
