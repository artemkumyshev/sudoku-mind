import { useClickAway } from '@uidotdev/usehooks';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { isEqual } from 'lodash';
import { FC } from 'react';

import { Button } from '@/shared/ui/button';
import { Flex } from '@/shared/ui/flex';

import { $$game } from '../../model';

import { useTranslation } from 'react-i18next';
import styles from './playground.module.css';

export const Playground: FC = () => {
  const [status] = useUnit([$$game.$status]);
  const ref = useClickAway<HTMLDivElement>(() => {
    $$game.cellSelectChanged({
      row: -1,
      col: -1,
      block: -1,
    });
  });

  if (status === 'game' || status === 'idle') {
    return (
      <Flex ref={ref} direction="column" gap="4" className="relative">
        <Grid />
        <PlayButton />
        <Keyboard />
        <ReadyButton />
      </Flex>
    );
  }
};

const Grid: FC = () => {
  const [status, grid, selectCell] = useUnit([$$game.$status, $$game.$grid, $$game.$selectCell]);

  if (status === 'game' || status === 'idle') {
    return (
      <div
        className={cn(styles.grid, {
          [styles.grid_blur]: status === 'idle',
        })}
      >
        {grid?.map((row, i) => (
          <div key={`row-${i}`} className={styles.grid__row}>
            {row.map((cell, j) => (
              <div
                key={`cell-${j}`}
                className={cn(styles[`block_${cell.block % 2 ? 'odd' : 'even'}`], styles.cell, {
                  [styles.cell_highlight]:
                    i === selectCell.row || j === selectCell.col || cell.block === selectCell.block,
                  [styles.cell_select]: i === selectCell.row && j === selectCell.col && cell.block === selectCell.block,
                  [styles.cell_answer]: !cell.isVisible && typeof cell.answer === 'number',
                  [styles.cell_done]: cell.answer === cell.value,
                })}
              >
                <button
                  className={styles.cell__button}
                  disabled={cell.isVisible || cell.answer === cell.value}
                  onClick={() => {
                    if (!isEqual([selectCell.row, selectCell.col], [i, j])) {
                      $$game.cellSelectChanged({
                        row: i,
                        col: j,
                        block: cell.block,
                      });
                    }
                  }}
                >
                  {cell.isVisible ? cell.value : cell.answer}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};

const Keyboard: FC = () => {
  const [selectCell, status] = useUnit([$$game.$selectCell, $$game.$status]);

  if (status !== 'game') {
    return null;
  }

  return (
    <div className={styles.keyboard}>
      {Array.from(Array(9).keys()).map((n) => (
        <button
          key={n}
          type="button"
          className={styles.keyboard__number}
          onClick={() => {
            $$game.answerChanged({
              row: selectCell.row,
              col: selectCell.col,
              answer: n + 1,
            });
          }}
        >
          <span>{n + 1}</span>
        </button>
      ))}
    </div>
  );
};

const PlayButton: FC = () => {
  const { t } = useTranslation();
  const [status] = useUnit([$$game.$status]);

  if (status !== 'idle') {
    return null;
  }

  return (
    <Button
      type="button"
      appearance="primary"
      icon="play-circle"
      className="absolute inset-0 w-60 h-10 m-auto"
      onClick={() => $$game.statusChanged('game')}
    >
      {t('app.play')}
    </Button>
  );
};

const ReadyButton: FC = () => {
  const { t } = useTranslation();
  const [isInspectionReady] = useUnit([$$game.$isInspectionReady]);

  if (!isInspectionReady) {
    return null;
  }

  return (
    <Button as="button" type="button" appearance="primary" onClick={() => $$game.checked()}>
      {t('app.check')}
    </Button>
  );
};
