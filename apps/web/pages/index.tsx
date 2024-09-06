import { Heading, Button, useChat, Message } from "@ai-kit/ui";
import { useState } from "react";

export default function Page() {

  const { messages, handleSubmit, handleInputChange } = useChat();
  const [input, setInput] = useState<string>('');

  return (
    <>
      <Heading>AI kit</Heading>
      {
        messages?.map(item => <Message role={item.role} content={item.content}></Message>)
      }
      <input onChange={(e) => {
        setInput(e.target.value);
        handleInputChange(e.target.value);
      }} />
      <Button onClick={() => {
        handleSubmit(input);
      }}>
        确认
      </Button>
    </>
  );
}
