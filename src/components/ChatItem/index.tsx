import { SparklesIcon, UserIcon } from 'lucide-react';
import { MessageProps } from '../../types/chat';
import { ChatMessage } from './components/ChatMessage';
import { useStyles } from './styles';

interface Props {
  message: MessageProps;
}

export const ChatItem = ({ message }: Props) => {
  const styles = useStyles({ role: message.role });

  const onUpdateMessage = async ({ newContent }: { newContent: string }) => {};

  return (
    <div css={styles.container}>
      {/* <Avatar.Root css={styles.avatarRoot}>
        <Avatar.Image
          css={styles.avatarImage}
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        />
        <Avatar.Fallback />
      </Avatar.Root> */}

      {message.role === 'assistant' ? (
        <SparklesIcon css={styles.icon} />
      ) : (
        <UserIcon css={styles.icon} />
      )}

      <ChatMessage onUpdateMessage={onUpdateMessage} message={message} />
    </div>
  );
};

export const ChatItemLoading = () => {
  return (
    <div
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      Loading...
    </div>
  );
};
