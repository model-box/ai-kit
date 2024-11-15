import { FormEvent } from 'react';
import { MessageProps } from '../../types/chat';
import { useStyles } from './styles';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: MessageProps[];
  setMessages: (messages: MessageProps[]) => void;
  append: (message: MessageProps) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const suggestedActions = [
  {
    title: 'What is the weather',
    label: 'in San Francisco?',
    action: 'What is the weather in San Francisco?',
  },
  {
    title: 'Help me draft an essay',
    label: 'about Silicon Valley',
    action: 'Help me draft a short essay about Silicon Valley',
  },
  {
    title: 'Help me write a poem',
    label: 'about the ocean',
    action: 'Help me write a poem about the ocean',
  },
];

export const ChatInput = ({
  input,
  setInput,
  isLoading,
  stop,
  messages,
  setMessages,
  append,
  handleSubmit,
}: ChatInputProps) => {
  const styles = useStyles({});

  const handleActionClick = (action: string) => {
    setInput(action);
    const syntheticEvent = {
      preventDefault: () => {},
    } as FormEvent<HTMLFormElement>;

    handleSubmit(syntheticEvent);
  };

  return (
    <div css={styles.container}>
      {messages.length === 0 && (
        <div css={styles.actionsContainer}>
          {suggestedActions.map((suggestedAction) => (
            <button
              onClick={() => handleActionClick(suggestedAction.action)}
              key={suggestedAction.title}
              css={styles.action}
            >
              {suggestedAction.title}
            </button>
          ))}
        </div>
      )}

      <input
        css={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Send a message..."
      />
    </div>
  );
};
