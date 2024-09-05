import React, { PropsWithChildren } from 'react';
import { MessageContextValue } from '../../context/messageContext';

export interface MessageContextProps {
  message?: MessageContextValue,
  className?: string,
}

function MessageTextWithContext <T extends MessageContextProps>(
  props: PropsWithChildren<T>,
):React.ReactElement {
  const {
    context,
    message,
    children,
  } = props;
  
return (
    <div className={`${message.role === 'user'}`}>
        <MessageText data={message} />
    </div>
);
  
}

const MemoizedMessageText = React.memo(MessageTextWithContext) as
typeof MessageTextWithContext;

export function MessageText(props:MessageContextProps):React.ReactElement {
  return (
    <MemoizedMessageText {...props} />
  );
}
