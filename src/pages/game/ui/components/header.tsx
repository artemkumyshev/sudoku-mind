import { useUnit } from 'effector-react';
import { IconName } from 'lucide-react/dynamic';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex } from '@/shared/ui/flex';
import { TextWithIcon } from '@/shared/ui/text-with-icon';

import { Button } from '@/shared/ui/button';
import { $$game } from '../../model';

const mistakesIcon: Record<number, IconName> = {
  0: 'laugh',
  1: 'smile',
  2: 'meh',
  3: 'annoyed',
  4: 'frown',
  5: 'angry',
};

export const Header: FC = () => {
  const { t } = useTranslation();
  const [status, mistakes] = useUnit([$$game.$status, $$game.$mistakes]);

  const isIdle = status === 'idle';
  const isGame = status === 'game';

  const icon = isIdle ? 'play' : isGame ? 'pause' : undefined;
  const toggleGame = () => {
    if (isIdle) $$game.statusChanged('game');
    if (isGame) $$game.statusChanged('idle');
  };

  return (
    <Flex align="center" justify="between">
      <TextWithIcon text={`${t('sudoku.mistakes')}: ${mistakes}/5`} icon={mistakesIcon[mistakes]} />
      {(isIdle || isGame) && icon && (
        <Flex gap="2">
          <Button className="rounded-4xl border-2 bg-white p-1.5" icon={icon} onClick={toggleGame} />
          <Button
            className="rounded-4xl border-2 bg-white p-1.5"
            icon="rotate-ccw"
            onClick={() => $$game.restarted()}
          />
        </Flex>
      )}
    </Flex>
  );
};
