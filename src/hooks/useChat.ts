import { useCallback, useEffect, useRef, useState } from 'react';
import { useConfig } from '../providers/ConfigProvider';

// Types
export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
};

export type UseChatOptions = {
  // apiKey?: string;
  // apiURL?: string;
  initialMessages?: Message[];
  model?: string;
  temperature?: number;
  onResponse?: (response: Response) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onFinish?: (message: Message) => void | Promise<void>;
};

// Helper to generate unique IDs
const nanoid = () =>
  Math.random().toString(36).slice(2, 10) +
  Math.random().toString(36).slice(2, 10);

export function useChat({
  initialMessages = [],
  model,
  temperature = 1,
  onResponse,
  onError,
  onFinish,
}: UseChatOptions = {}) {
  const { auth } = useConfig();

  const { apiURL, publicKey } = auth;

  // States
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup effect
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const append = useCallback(
    async (message: string | Omit<Message, 'id'>) => {
      if (!publicKey) {
        throw new Error('OpenAI API key is required');
      }

      setError(null);

      const userMessage: Message = {
        id: nanoid(),
        content: typeof message === 'string' ? message : message.content,
        role: 'user',
      };

      setMessages((messages) => [...messages, userMessage]);

      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const response = await fetch(`${apiURL}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              ...messages,
              { role: 'user', content: userMessage.content },
            ],
            temperature,
            stream: true,
          }),
          signal: abortControllerRef.current.signal,
        });

        // Trigger onResponse callback
        await onResponse?.(response);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch response');
        }

        if (!response.body) {
          throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        const assistantMessageId = nanoid();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          const parsedLines = lines
            .map((line) => line.replace(/^data: /, '').trim())
            .filter((line) => line !== '' && line !== '[DONE]')
            .map((line) => JSON.parse(line));

          for (const parsedLine of parsedLines) {
            const content = parsedLine.choices[0]?.delta?.content || '';
            assistantMessage += content;

            setMessages((messages) => {
              const lastMessage = messages[messages.length - 1];
              if (lastMessage && lastMessage.id === assistantMessageId) {
                return [
                  ...messages.slice(0, -1),
                  { ...lastMessage, content: assistantMessage },
                ];
              }
              return [
                ...messages,
                {
                  id: assistantMessageId,
                  content: assistantMessage,
                  role: 'assistant',
                },
              ];
            });
          }
        }

        // Trigger onFinish callback with the complete assistant message
        const finalMessage: Message = {
          id: assistantMessageId,
          content: assistantMessage,
          role: 'assistant',
        };
        await onFinish?.(finalMessage);
      } catch (err) {
        if (err.name === 'AbortError') return;
        const error = err as Error;
        setError(error);
        // Trigger onError callback
        await onError?.(error);
        throw error;
      }
    },
    [
      messages,
      publicKey,
      apiURL,
      model,
      temperature,
      onResponse,
      onError,
      onFinish,
    ]
  );

  const reload = useCallback(async () => {
    if (messages.length === 0) return;
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'user');
    if (!lastUserMessage) return;

    // Remove last assistant message if there is one
    setMessages((messages) => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant') {
        return messages.slice(0, -1);
      }
      return messages;
    });

    await append(lastUserMessage);
  }, [messages, append]);

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    append,
    reload,
    stop,
    clear,
    error,
  };
}
