import { Chat } from '@model-box/ai-kit';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        style={{
          maxWidth: '1024px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Chat />
      </div>
    </div>
  );
}

export default App;
