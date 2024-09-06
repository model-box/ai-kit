import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../const';


export interface MessageType {
    preMessageId?: string;
    id: "user" | "assistant" | "system";
    role: string;
    content: string;
}

export function useChat() {
  const [rawMessages, setRawMessages] = useState<Array<MessageType>>([]);
  const [input, setInput] = useState('');

  const messages = useMemo(() => {
    return rawMessages.map((message) => {
      return {
        ...message,
        preMessageId: message.preMessageId || message.id,
      };
    });
  }, [rawMessages]);

  const handleInputChange = (input: string) => {
    setInput(input);
  };

  const handleSubmit = useCallback(async (input: string) => {

    if (!input.trim()) return;

    const newMessage = { id: uuidv4(), role: 'user', content: input, preMessageId: messages.slice(-1)[0]?.id };
    const newMessages = [...rawMessages, newMessage];

    setRawMessages(newMessages);
    setInput('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: newMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      const data = await response.json();
      const assistantMessage = { 
        id: uuidv4(), 
        role: data.choices[0].message.role, 
        content: data.choices[0].message.content 
      };

      setRawMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [input, rawMessages]);

  return {
    rawMessages,
    messages,
    handleInputChange,
    handleSubmit,
    input
  };
}