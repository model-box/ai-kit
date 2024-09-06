
import BubbleText from '../BubbleText';

// 定义消息类型
export interface MessageType {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Message = (props: MessageType) => {
  console.log(1212, props);
  return (
    // message container
    <BubbleText>{props.content}</BubbleText>
  );
}

export default Message;