import React, { PropsWithChildren, useContext } from 'react';

export interface MessageContextValue { 
  role: string; 
  content: string
}

export const MessageContext = React.createContext<MessageContextValue>({});

export function MessageContextProvider({ children, value }: PropsWithChildren<{
    value: MessageContextValue
}>):React.ReactElement {
  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext(componentName?:string): MessageContextValue {
  const contextValue = useContext(MessageContext);

  if (!contextValue && componentName) {
    return {} as MessageContextValue;
  }
  return (contextValue as unknown) as MessageContextValue;
}
