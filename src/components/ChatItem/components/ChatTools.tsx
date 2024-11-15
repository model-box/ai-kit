import { CopyIcon, PencilIcon, ShareIcon } from 'lucide-react';
import { MessageProps } from '../../../types/chat';
import { useStyles } from '../styles';

interface ChatToolsProps {
  message: MessageProps;
  onEdit: () => void;
}

export const ChatTools = ({ message, onEdit }: ChatToolsProps) => {
  const styles = useStyles({ role: message.role });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
  };

  const handleShare = async () => {};

  return (
    <div css={styles.messageTools}>
      <button onClick={onEdit} css={styles.messageToolsButton}>
        <PencilIcon css={styles.messageToolsIcon} />
      </button>

      <button onClick={handleCopy} css={styles.messageToolsButton}>
        <CopyIcon css={styles.messageToolsIcon} />
      </button>

      <button onClick={handleShare} css={styles.messageToolsButton}>
        <ShareIcon css={styles.messageToolsIcon} />
      </button>
    </div>
  );
};
