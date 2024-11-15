import { FormEvent, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { useConfig } from '../../providers/ConfigProvider';
import { ChatInput } from '../ChatInput';
import { ChatItem, ChatItemLoading } from '../ChatItem';
import { useStyles } from './styles';

export const Chat = () => {
  const styles = useStyles({});

  const config = useConfig();

  const { messages, append, stop } = useChat({
    model: config.defaultModel,
    onError: (error) => {
      setIsLoadingMessage(false);
      console.error('Error occurred:', error);
    },
    onResponse: (response) => {
      setIsLoadingMessage(false);
      console.log('Response received:', response);
    },
    onFinish: (message) => {
      setIsLoadingMessage(false);
      console.log('Message finished:', message);
    },
  });

  const [input, setInput] = useState('');
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingMessage(true);
    append(input);
    setInput('');
  };

  return (
    <div css={styles.container}>
      <div>
        {messages.map((message) => (
          <ChatItem key={message.id} message={message} />
        ))}

        {isLoadingMessage && <ChatItemLoading />}
      </div>

      <form css={styles.formContainer} onSubmit={handleSubmit}>
        <ChatInput
          input={input}
          setInput={setInput}
          isLoading={isLoadingMessage}
          stop={() => {}}
          messages={messages}
          setMessages={() => {}}
          append={() => {}}
          handleSubmit={handleSubmit}
        />

        <div css={styles.actionButtonsContainer}>
          <button type="submit" disabled={isLoadingMessage}>
            Send
          </button>
          <button type="button" onClick={stop}>
            Stop
          </button>
        </div>
      </form>
    </div>
  );
};
