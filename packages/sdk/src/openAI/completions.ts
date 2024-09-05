import React, { createContext, useContext, useState, useCallback } from 'react';
import OpenAI from 'openai';

interface AIKitContextType {
  client: OpenAI;
  messages: Array<{ role: string; content: string }>;
  onMessage: (message: string) => Promise<void>;
  abort: () => void;
  retry: () => Promise<void>;
}

const AIKitContext = createContext<AIKitContextType | undefined>(undefined);

interface AIKitProviderProps {
  client: OpenAI;
  children: React.ReactNode;
}

export const AIKitProvider: React.FC<AIKitProviderProps> = ({ client, children }) => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const onMessage = useCallback(async (message: string) => {
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const stream = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: newMessages,
        stream: true,
      }, { signal: controller.signal });

      let assistantMessage = '';
      for await (const chunk of stream) {
        assistantMessage += chunk.choices[0]?.delta?.content || '';
      }

      setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error('Error:', error);
      }
    } finally {
      setAbortController(null);
    }
  }, [client, messages]);

  const abort = useCallback(() => {
    if (abortController) {
      abortController.abort();
    }
  }, [abortController]);

  const retry = useCallback(async () => {
    if (messages.length > 0) {
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage.role === 'user') {
        await onMessage(lastUserMessage.content);
      }
    }
  }, [messages, onMessage]);

  return (
    <AIKitContext.Provider value={{ client, messages, onMessage, abort, retry }}>
      {children}
    </AIKitContext.Provider>
  );
};

export const useAIKit = () => {
  const context = useContext(AIKitContext);
  if (context === undefined) {
    throw new Error('useAIKit must be used within an AIKitProvider');
  }
  return context;
};