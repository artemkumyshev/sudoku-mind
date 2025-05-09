import cn from 'classnames';
import { ElementType } from 'react';

import { TypographyProps } from './typography.props';

import styles from './typography.module.css';

const defaultElement = 'div';

export const Typography = <E extends ElementType = typeof defaultElement>({
  display,
  text,
  className,
  children,
  as,
  ...props
}: TypographyProps<E>) => {
  const TagName = as || defaultElement;

  return (
    <TagName
      className={cn(
        {
          [styles[`display_${display}`]]: display,
          [styles[`text_${text}`]]: text,
        },
        className,
      )}
      {...props}
    >
      {children}
    </TagName>
  );
};
