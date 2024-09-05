import React from 'react';
import { useMessageContext } from './message-context';

const MessageItem = ({index} : {index: number}) => <div>{index}: 123</div>

const MessageList = () => {
  const { messages, addMessage, clearMessages } = useMessageContext();

  return (
    <>
      {messages.map((item, index) => {
        return <MessageItem key={index} index={index} />
      })}
    </>
  );
}

export default MessageList;