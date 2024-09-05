import React from 'react';
import { MessageProvider } from './message-context';
import MessageList from './message-list';

// 定义消息类型
export interface MessageType {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

function Message() {

  return (
    <MessageProvider initialState={[]}>
      <MessageList />
    </MessageProvider>
  );
}

export default Message;