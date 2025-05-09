import cn from 'classnames';
import { FC, ReactNode } from 'react';

interface ButtonGroupItem {
  label: string | ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ items }) => {
  if (items.length < 2 || items.length > 6) {
    console.warn('ButtonGroup supports only 2 to 6 items.');
    return null;
  }

  return (
    <div className="grid w-full grid-cols-2 gap-1 sm:grid-cols-3" role="group">
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={item.onClick}
          className={cn(
            'w-full border-2 border-neutral-800 px-4 py-2 text-center text-sm font-medium text-neutral-800 transition-colors',
            {
              'bg-primary-200': item.isActive,
            },
            'rounded-lg',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
