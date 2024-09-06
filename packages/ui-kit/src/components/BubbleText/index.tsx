import React from 'react';

export interface BubbleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  type?: string;
  content?: React.ReactNode;
  isTyping?: boolean;
}

const BubbleText = React.forwardRef<HTMLDivElement, BubbleProps>((props, ref) => {
  const { type = 'text', content, children, isTyping = false, ...other } = props;
  if(isTyping) {
    return (
      <div className={`bubble ${type}`}>
        ...
      </div>
    )
  }

  return (
    <div className={`bubble bubble-${type}`} data-type={type}  {...other}>
      {children}
    </div>
  );
});

export default BubbleText;