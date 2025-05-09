import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { FC } from 'react';

import { Flex } from '../flex';
import { Typography } from '../typography';

interface TextWithIconProps {
  icon: IconName;
  text: string;
}

export const TextWithIcon: FC<TextWithIconProps> = ({ icon, text }) => {
  return (
    <Flex gap="1" align="center">
      <DynamicIcon name={icon} />
      <Typography as="span" text="large">
        {text}
      </Typography>
    </Flex>
  );
};
