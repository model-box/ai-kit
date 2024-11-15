import { useEffect, useRef, useState } from 'react';
import { MessageProps } from '../../../types/chat';
import { Markdown } from '../../Markdown';
import { TextArea } from '../../TextArea';
import { useStyles } from '../styles';
import { ChatTools } from './ChatTools';

export const ChatMessage = ({
  message,
  onUpdateMessage,
}: {
  message: MessageProps;
  onUpdateMessage: ({ newContent }: { newContent: string }) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [newContent, setNewContent] = useState(message.content);
  const [shouldStream, setShouldStream] = useState(
    message.role === 'assistant'
  );

  useEffect(() => {
    if (!isEditing) return;
    setShouldStream(false);
  }, [isEditing]);

  const styles = useStyles({ role: message.role, isEditing });

  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      css={styles.messageContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isEditing ? (
        <div css={styles.messageEditing}>
          <TextArea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <div css={styles.messageToolsContainer}>
            <button
              onClick={() => {
                setNewContent(message.content);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onUpdateMessage({ newContent });
                setIsEditing(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div css={styles.messageContent}>
          <StreamMarkdown
            steaming={shouldStream}
            content={message.content}
            streamInterval={5}
          />
        </div>
      )}

      {isHovering && !isEditing && (
        <div css={styles.messageToolsContainer}>
          <ChatTools
            message={message}
            onEdit={() => {
              setIsEditing(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

const StreamMarkdown = ({
  content,
  streamInterval,
  steaming = false,
}: {
  content: string;
  streamInterval: number;
  steaming?: boolean;
}) => {
  const [displayContent, setDisplayContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!steaming) {
      setDisplayContent(content);
      setCurrentIndex(content.length);
      return;
    }

    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayContent((prevContent) => prevContent + content[currentIndex]);
        setCurrentIndex((i) => i + 1);
      }, streamInterval);

      return () => clearTimeout(timer);
    }
  }, [content, currentIndex, streamInterval, steaming]);

  return <Markdown>{displayContent}</Markdown>;
};
