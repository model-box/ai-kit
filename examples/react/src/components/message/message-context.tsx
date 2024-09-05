import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { MessageType } from './index';

interface MessageContextType {
  messages: MessageType[];
  addMessage: (message: MessageType) => void;
  clearMessages: () => void;
}

const initMessage = (message: MessageType) => {};
const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children, initialState }: { children: ReactNode, initialState: MessageType[] }) {

  const initialMsgs: MessageType[] = useMemo(() => initialState.map((t) => initMessage(t)), [initialState]);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSubmit = (message: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const addMessage = (message: MessageType) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const updateMessage = useCallback((id: any, msg: MessageType) => {
    setMessages((prev) => prev.map((t) => (t._id === id ? initMessage(msg) : t)));
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((t) => t.id !== id));
  }, []);



  return (
    <MessageContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
}