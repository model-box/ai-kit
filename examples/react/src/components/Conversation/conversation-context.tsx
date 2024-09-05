import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MessageType } from '../Message';

// Define Conversation type
interface Conversation {
  id: string;
  title: string;
  messages: MessageType[];
}


// Define context value type
interface ConversationContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  addConversation: (conversation: Conversation) => void;
  setCurrentConversation: (conversationId: string) => void;
  addMessageToCurrentConversation: (message: MessageType) => void;
  clearCurrentConversation: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);

  const addConversation = (conversation: Conversation) => {
    setConversations((prevConversations) => [...prevConversations, conversation]);
  };

  const setCurrentConversationById = (conversationId: string) => {
    const conversation = conversations.find((conv) => conv.id === conversationId);
    setCurrentConversation(conversation || null);
  };

  const addMessageToCurrentConversation = (message: MessageType) => {
    if (currentConversation) {
      const updatedConversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, message],
      };
      setCurrentConversation(updatedConversation);
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === currentConversation.id ? updatedConversation : conv
        )
      );
    }
  };

  const clearCurrentConversation = () => {
    setCurrentConversation(null);
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        addConversation,
        setCurrentConversation: setCurrentConversationById,
        addMessageToCurrentConversation,
        clearCurrentConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversationContext() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversationContext must be used within a ConversationProvider');
  }
  return context;
}
