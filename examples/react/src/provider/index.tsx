import React, { createContext, useCallback, useContext, useState } from "react";
import { AIKitClient } from "./openai/client";
import { MessageType } from "../components/Message";

interface AIKitContextType {
  messages: Array<{ role: string; content: string }>;
  onMessage: (message: string) => Promise<void>;
  abort: () => void;
  retry: () => Promise<void>;
}

const AIKitContext = createContext<AIKitContextType | undefined>(undefined);

interface AIKitProviderProps {
  client: AIKitClient;
  children: React.ReactNode;
}

export const AIKitProvider: React.FC<AIKitProviderProps> = ({
  client,
  children,
}) => {
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const onMessage = useCallback(
    async (message: string) => {
      const newMessages: Array<MessageType> = [...messages, { role: "user", content: message }];
      setMessages(newMessages);

      const controller = new AbortController();
      setAbortController(controller);

      try {
        const response = await client.createChatCompletion(newMessages);
        const assistantMessage = response.choices[0]?.message?.content || "";
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: assistantMessage },
        ]);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("abort error");
        } else {
          console.error("err:", error);
        }
      } finally {
        setAbortController(null);
      }
    },
    [client, messages],
  );

  const abort = useCallback(() => {
    if (abortController) {
      abortController.abort();
    }
  }, [abortController]);

  const retry = useCallback(async () => {
    if (messages.length > 0) {
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage.role === "user") {
        await onMessage(lastUserMessage.content);
      }
    }
  }, [messages, onMessage]);

  return (
    <AIKitContext.Provider value={{ messages, onMessage, abort, retry }}>
      {children}
    </AIKitContext.Provider>
  );
};

export const useAIKit = () => {
  const context = useContext(AIKitContext);
  if (context === undefined) {
    throw new Error("context is undefined");
  }
  return context;
};
