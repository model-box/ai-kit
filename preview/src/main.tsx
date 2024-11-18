import { Provider } from '@model-box/ai-kit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const config = {
  auth: {
    publicKey: import.meta.env.VITE_PUBLIC_KEY,
    apiURL: import.meta.env.VITE_API_URL,
  },
  defaultModel: 'deepseek/deepseek-chat',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider config={config}>
      <App />
    </Provider>
  </StrictMode>
);
