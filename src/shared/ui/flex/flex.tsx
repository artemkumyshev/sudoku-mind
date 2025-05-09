import cn from 'classnames';
import { forwardRef, PropsWithChildren } from 'react';

interface FlexProps extends PropsWithChildren {
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  justify?: 'start' | 'center' | 'end' | 'between';
  align?: 'start' | 'center' | 'end';
  direction?: 'row' | 'column';
  wrap?: boolean;
  className?: string;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ gap, align, justify, direction, wrap, className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          {
            ['gap-0']: gap === '0',
            ['gap-1']: gap === '1',
            ['gap-2']: gap === '2',
            ['gap-3']: gap === '3',
            ['gap-4']: gap === '4',
            ['gap-5']: gap === '5',
            ['gap-6']: gap === '6',
            ['gap-7']: gap === '7',
            ['gap-8']: gap === '8',
            ['justify-start']: justify === 'start',
            ['justify-center']: justify === 'center',
            ['justify-end']: justify === 'end',
            ['justify-between']: justify === 'between',
            ['items-start']: align === 'start',
            ['items-center']: align === 'center',
            ['items-end']: align === 'end',
            ['flex-row']: direction === 'row',
            ['flex-col']: direction === 'column',
            ['flex-wrap']: wrap,
            ['flex-nowrap']: !wrap,
          },
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
