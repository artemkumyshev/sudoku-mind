import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { $$level } from '@/shared/model/level';
import { routes } from '@/shared/router';
import { Button } from '@/shared/ui/button';
import { ButtonGroup } from '@/shared/ui/button-group';
import { Flex } from '@/shared/ui/flex';
import { Typography } from '@/shared/ui/typography';
import { Link } from 'atomic-router-react';

const HomePage = () => {
  const { t } = useTranslation();
  const [level] = useUnit([$$level.$level]);

  return (
    <>
      <Flex direction="column" align="center" className="text-center">
        <Typography as="h1" display="1">
          {t('app.title')}
        </Typography>
        <Typography as="p" text="large">
          {t('app.description')}
        </Typography>
      </Flex>
      <ButtonGroup
        items={(['easy', 'medium', 'hard', 'expert', 'evil'] as const).map((item) => ({
          label: t(`sudoku.levels.${item}`),
          isActive: level === item,
          onClick: () => $$level.changed(item),
        }))}
      />
      <Button as={Link} to={routes.game} appearance="primary">
        {t('app.play')}
      </Button>
    </>
  );
};

export default HomePage;
