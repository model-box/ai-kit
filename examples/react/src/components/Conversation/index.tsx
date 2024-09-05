import React from 'react';
import { ConversationProvider } from './conversation-context';
import ConversationList from './conversation-list';

function Conversation() {
  return (
    <ConversationProvider>
      <ConversationList />
    </ConversationProvider>
  );
}

export default Conversation;
