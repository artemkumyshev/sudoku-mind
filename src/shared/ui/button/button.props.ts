import { IconName } from 'lucide-react/dynamic';
import { ComponentProps, ElementType, PropsWithChildren } from 'react';

type ButtonOwnProps<E extends ElementType> = PropsWithChildren & {
  appearance?: 'primary' | 'secondary' | 'tertiary';
  icon?: IconName;
  as?: E;
  className?: string;
};

export type ButtonProps<E extends ElementType = 'button'> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps<E>>;
