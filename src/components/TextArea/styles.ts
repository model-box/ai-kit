import { css } from '@emotion/react';

interface StyleProps {}

export const useStyles = (props: StyleProps) => {
  return {
    textarea: css({
      width: '100%',
      minHeight: '120px',
      height: 'auto',
      fontSize: '14px',
      overflow: 'hidden',
      resize: 'none',
      '&::placeholder': {
        color: 'var(--muted-foreground, #64748b)',
      },
    }),
  };
};
