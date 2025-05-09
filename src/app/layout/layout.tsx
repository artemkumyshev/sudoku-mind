import { Link } from 'atomic-router-react';
import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/router';
import { Button } from '@/shared/ui/button';
import { Flex } from '@/shared/ui/flex';
import { Typography } from '@/shared/ui/typography';

import styles from './layout.module.css';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t, i18n } = useTranslation();

  return (
    <Flex direction="column" gap="6" className={styles.layout}>
      <Flex align="center" justify="between" gap="4" className={styles.header}>
        <Flex align="center" gap="2">
          <Button
            className={styles.home}
            activeClassName={styles.home_active}
            as={Link}
            to={routes.home}
            icon="brain"
          />
          <Typography as="span" text="base" className="font-bold uppercase">
            {t('app.name')}
          </Typography>
        </Flex>

        <Flex gap="2">
          <Button className={styles.action} onClick={() => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')}>
            {i18n.language === 'ru' ? 'РУ' : 'EN'}
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" gap="4" className={styles.main}>
        {children}
      </Flex>
    </Flex>
  );
};
