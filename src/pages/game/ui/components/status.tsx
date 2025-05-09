import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/router';
import { Button } from '@/shared/ui/button';
import { Flex } from '@/shared/ui/flex';
import { WinLost } from '@/shared/ui/win-lost';

import { $$game } from '../../model';

export const Status: FC = () => {
  const { t } = useTranslation();
  const [status] = useUnit([$$game.$status]);

  if (status === 'win') {
    return (
      <WinLost
        title={t('sudoku.status.win.title')}
        description={t('sudoku.status.win.description')}
        status="win"
        button={<StatusButtons />}
      />
    );
  }

  if (status === 'lost') {
    return (
      <WinLost
        title={t('sudoku.status.lost.title')}
        description={t('sudoku.status.lost.description')}
        status="lost"
        button={<StatusButtons />}
      />
    );
  }

  return null;
};

const StatusButtons: FC = () => {
  const { t } = useTranslation();
  return (
    <Flex direction="column" gap="1">
      <Button appearance="primary" onClick={() => $$game.restarted()}>
        {t('app.playAgain')}
      </Button>
      <Button as={Link} to={routes.home} appearance="tertiary">
        {t('app.changeLevel')}
      </Button>
    </Flex>
  );
};
