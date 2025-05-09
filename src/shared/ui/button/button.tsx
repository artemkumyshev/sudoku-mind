import cn from 'classnames';
import { DynamicIcon } from 'lucide-react/dynamic';
import { ElementType } from 'react';

import { ButtonProps } from './button.props';

import styles from './button.module.css';

const defaultElement = 'button';

export const Button = <E extends ElementType = typeof defaultElement>({
  appearance,
  as,
  icon,
  children,
  className,
  ...props
}: ButtonProps<E>) => {
  const TagName = as || defaultElement;
  return (
    <TagName {...props} className={cn(styles.button, styles[`button_${appearance}`], className)}>
      {icon && <DynamicIcon name={icon} />}
      {children && <span>{children}</span>}
    </TagName>
  );
};
