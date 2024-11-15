import { css } from '@emotion/react';

interface StyleProps {}

export const useStyles = (props: StyleProps) => {
  return {
    container: css({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '16px',
      flex: 1,
      padding: '16px',
    }),

    formContainer: css({
      width: '100%',
      position: 'relative',
    }),

    actionButtonsContainer: css({
      position: 'absolute',
      bottom: '0',
      right: '0',
      display: 'flex',
    }),
  };
};
