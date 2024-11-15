import { css } from '@emotion/react';

interface StyleProps {}

export const useStyles = (props: StyleProps) => {
  return {
    container: css({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '100%',
    }),

    actionsContainer: css({
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      width: '100%',
    }),

    action: css({
      padding: '8px 12px',
      borderRadius: '12px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),

    input: css({
      width: '100%',
      outline: 'none',
      fontSize: '16px',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      lineHeight: 'inherit',
      backgroundColor: 'transparent',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '12px',
    }),
  };
};
