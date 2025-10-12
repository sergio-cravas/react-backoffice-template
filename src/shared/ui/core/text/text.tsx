import { PropsWithChildren } from 'react';

import cn from 'clsx';

import colors from '@/shared/styles/colors.module.scss';

import './text.scss';

type TextProps = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  color?: keyof typeof colors;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-xl' | 'body-l' | 'body-m' | 'body-s';
  weight?: 'regular' | 'medium' | 'semi-bold' | 'bold';
  onClick?: () => void;
}>;

type TextBuilderProps = Omit<TextProps, 'as' | 'variant'>;

const getColorStyle = (color?: keyof typeof colors, style?: React.CSSProperties): React.CSSProperties => ({
  ...style,
  ...(color && { color: colors[color] as string }),
});

const AsBuilder = {
  h2: ({ color, style, ...props }: TextBuilderProps) => <h2 {...props} style={getColorStyle(color, style)} />,
  h1: ({ color, style, ...props }: TextBuilderProps) => <h1 {...props} style={getColorStyle(color, style)} />,
  h3: ({ color, style, ...props }: TextBuilderProps) => <h3 {...props} style={getColorStyle(color, style)} />,
  h4: ({ color, style, ...props }: TextBuilderProps) => <h4 {...props} style={getColorStyle(color, style)} />,
  h5: ({ color, style, ...props }: TextBuilderProps) => <h5 {...props} style={getColorStyle(color, style)} />,
  h6: ({ color, style, ...props }: TextBuilderProps) => <h6 {...props} style={getColorStyle(color, style)} />,
  p: ({ color, style, ...props }: TextBuilderProps) => <p {...props} style={getColorStyle(color, style)} />,
  span: ({ color, style, ...props }: TextBuilderProps) => <span {...props} style={getColorStyle(color, style)} />,
  default: ({ color, style, ...props }: TextBuilderProps) => <div {...props} style={getColorStyle(color, style)} />,
};

export const Text = ({ className, as, variant = 'body-m', weight, ...props }: TextProps) => {
  const classNames = cn('text', `text--${variant}`, { [`text--weight-${weight}`]: !!weight }, className);

  return AsBuilder[as ?? 'default']({ className: classNames, ...props });
};
