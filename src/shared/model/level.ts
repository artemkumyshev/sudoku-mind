import { atom } from '@/shared/libs/atom';
import { createEvent, createStore } from 'effector';
import persist from 'effector-localstorage';

import { SudokuLevel } from '@/shared/libs/sudoku-factory';

const DEFAULT_LEVEL = (localStorage.getItem('level') as SudokuLevel) || 'easy';

export const $$level = atom(() => {
  const changed = createEvent<SudokuLevel>();
  const $level = createStore<SudokuLevel>(DEFAULT_LEVEL).on(changed, (_, payload) => payload);

  $level
    .on(changed, (_, payload) => payload)
    .watch((level) => {
      const html = document.documentElement;
      html.setAttribute('data-level', level);
    });

  persist({
    store: $level,
    key: 'level',
  });

  return { $level, changed };
});
