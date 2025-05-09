import cn from 'classnames';
import { FC, ReactNode, useRef } from 'react';
import Confetti from 'react-confetti';
import { Rain } from 'react-rainfall';

import partyFlag1Image from '@/shared/assets/images/party-flag-1.png';
import partyFlag2Image from '@/shared/assets/images/party-flag-2.png';

import { Flex } from '@/shared/ui/flex';
import { Typography } from '@/shared/ui/typography';

import styles from './win-lost.module.css';

interface WinLostProps {
  title: string;
  description: string;
  status: 'win' | 'lost';
  button?: ReactNode;
}

export const WinLost: FC<WinLostProps> = ({ title, description, status, button }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn({
        [styles.status_win]: status === 'win',
        [styles.status_lost]: status === 'lost',
      })}
    >
      <div ref={wrapperRef} className={styles.wrapper}>
        {status === 'win' && (
          <div className={styles.confetti}>
            {[partyFlag1Image, partyFlag2Image].map((item, i) => (
              <img key={i} alt={`Party flag ${i + 1}`} className={cn(styles[`confetti__item_${i + 1}`])} src={item} />
            ))}
          </div>
        )}
        {status === 'win' && (
          <Confetti height={wrapperRef.current?.offsetHeight} width={wrapperRef.current?.offsetWidth} />
        )}
        {status === 'lost' && <Rain />}
        <Flex direction="column" align="center" gap="2" className="text-white text-center z-20">
          <Typography as="div" display="2">
            {title}
          </Typography>
          <Typography as="div" display="6" className="font-medium!">
            {description}
          </Typography>
          {button}
        </Flex>
      </div>
    </div>
  );
};
