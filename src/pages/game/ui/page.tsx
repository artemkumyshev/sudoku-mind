import { useUnit } from 'effector-react';

import { Flex } from '@/shared/ui/flex';
import { TextWithIcon } from '@/shared/ui/text-with-icon';
import { useTranslation } from 'react-i18next';

import { Header } from './components/header';
import { Playground } from './components/playground';
import { Status } from './components/status';

import { $$game } from '../model';

const GamePage = () => {
  const { t } = useTranslation();
  const [isCreating] = useUnit([$$game.$isCreating]);

  if (!isCreating) {
    return (
      <Flex align="center" justify="center">
        <TextWithIcon text={t('app.loading')} icon="loader" />
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Playground />
      <Status />
    </>
  );
};

export default GamePage;
