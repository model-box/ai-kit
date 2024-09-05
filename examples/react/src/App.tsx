import Message from './components/Message';
import React from 'react';

export const ENDPOINT = 'https://api.model.box';
export const COMPLETIONAPI = 'https://api.model.box/v1/chat/completions';

const App: React.FC = () => {
  const apiKey = 'your-api-key-here';

  console.log('123');

  return (
    <div>
      123
      <Message />
    </div>
  );
};

export default App;
