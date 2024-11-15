import { css } from '@emotion/react';
import { RoleType } from '../../types/chat';

interface StyleProps {
  role: RoleType;
  isEditing?: boolean;
}

export const useStyles = (props: StyleProps) => {
  return {
    container: css({
      width: '100%',
      maxWidth: '100vw',
      padding: '16px',
      display: 'flex',
      gap: '16px',
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: '16px',
    }),

    icon: css({
      width: '24px',
      height: '24px',
      backgroundColor: 'var(--muted-foreground, #f9fafc)',
      padding: '12px',
      borderRadius: '8px',
    }),

    avatarRoot: css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'middle',
      overflow: 'hidden',
      userSelect: 'none',
      width: '45px',
      height: '45px',
      borderRadius: '100%',
      backgroundColor: 'var(--black-a3)',
    }),
    avatarImage: css({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'inherit',
    }),

    messageContainer: css({
      flex: props.isEditing ? 1 : 'unset',
      position: 'relative',
      display: 'flex',
      backgroundColor: props.role === 'assistant' ? '#f9fafc' : '#fff',
      borderRadius: '16px',
    }),

    messageContent: css({
      flex: 1,
      maxWidth: '100%',
      position: 'relative',
      display: 'flex',
      padding: '4px 12px',
      minWidth: '240px',
      border: props.role === 'assistant' ? 'none' : '2px solid #eee',
      borderRadius: '16px',
    }),

    messageEditing: css({
      flex: 1,
      maxWidth: '100%',
      position: 'relative',
      display: 'flex',
    }),

    messageToolsContainer: css({
      position: 'absolute',
      bottom: props.isEditing ? '12px' : '12px',
      right: props.isEditing ? '12px' : '12px',
      display: 'flex',
      gap: '8px',
      zIndex: 10,
    }),

    messageTools: css({
      display: 'flex',
      gap: '8px',
      borderRadius: '8px',
      backgroundColor: '#f9fafc',
    }),

    messageToolsButton: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      padding: '8px',
      cursor: 'pointer',
      backgroundColor: '#eee',
      border: 'none',
    }),

    messageToolsIcon: css({
      width: '16px',
      height: '16px',
    }),
  };
};
