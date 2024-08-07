
export const isAssistantMessage = (message: any): boolean =>  message?.role === 'assistant';
export const isFunctionMessage = (message: any): boolean =>  message?.role === 'function';
export const isToolMessage = (message: any): boolean =>  message?.role === 'tool';

