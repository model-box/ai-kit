import React from 'react';
import { useConversationContext } from './conversation-context';

const ConversationList: React.FC = () => {
  const { conversations, currentConversation, setCurrentConversation } = useConversationContext();

  return (
    <div className="conversation-list">
      <h2>Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => setCurrentConversation(conversation.id)}
              className={currentConversation?.id === conversation.id ? 'active' : ''}
            >
              {conversation.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationList;
