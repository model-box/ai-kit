import * as React from 'react';
import { useStyles } from './styles';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }, ref) => {
    const styles = useStyles({});

    return <textarea css={styles.textarea} ref={ref} {...props} />;
  }
);
