import { ComponentProps, ElementType, PropsWithChildren } from 'react';

export const display = ['1', '2', '3', '4', '5', '6'] as const;
export const size = ['small', 'base', 'large'] as const;
type Display = (typeof display)[number];
type Size = (typeof size)[number];

type DisplayType = {
  display: Display;
  text?: never;
};

type TextType = {
  text: Size;
  display?: never;
};

type TypographyOwnProps<E extends ElementType = ElementType> = (
  | DisplayType
  | TextType
) &
  PropsWithChildren & {
    className?: string;
    as?: E;
  };

export type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<ComponentProps<E>, keyof TypographyOwnProps>;
