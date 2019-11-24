import React from 'react';
import { socket } from '../socket';
import { useInterval } from '../hooks/useInterval';
import '../styles/connection-indicator.css';

export const ConnectionIndicator = () => {
  const [connected, setConnected] = React.useState(socket.connected);

  useInterval(() => {
    // Uso un if per evitare di triggerare un re-render ogni mezzo secondo
    if (socket.connected !== connected)
      setConnected(socket.connected);
  }, 500);

  return (
    <div className={`connection-indicator ${connected ? 'connected' : 'not-connected'}`}>
      <p>
        {connected ? 'connesso' : 'non connesso'}
      </p>
    </div>
  );
};
