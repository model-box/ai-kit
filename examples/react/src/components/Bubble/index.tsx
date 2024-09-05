import React from 'react';
import './index.scss';

export interface BubbleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  type?: string;
  content?: React.ReactNode;
}

export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>((props, ref) => {
  const { type = 'text', content, children, ...other } = props;
  return (
    <div className={`Bubble ${type}`} data-type={type} ref={ref} {...other}>
      {content && <p>{content}</p>}
      {children}
    </div>
  );
});