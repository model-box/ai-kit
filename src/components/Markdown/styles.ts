import { css } from '@emotion/react';

interface StyleProps {}

export const useStyles = (props: StyleProps) => {
  return {
    markdown: css({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
    }),
    h1: css({
      margin: '0',
      fontSize: '32px',
      fontWeight: 'bold',
    }),
    h2: css({
      margin: '0',
      fontSize: '24px',
      fontWeight: 'bold',
    }),
    h3: css({
      margin: '0',
      fontSize: '20px',
      fontWeight: 'semibold',
    }),
    a: css({
      color: '#007bff',
      textDecoration: 'underline',
    }),
    code: css({
      backgroundColor: '#f0f0f0',
      padding: '2px 4px',
      borderRadius: '6px',
    }),
  };
};
