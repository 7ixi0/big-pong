import React from 'react';
import { socket } from './socket';
import { useInterval } from './hooks/useInterval';

export const ConnectionIndicator = () => {
  const [connected, setConnected] = React.useState(socket.connected);

  useInterval(() => {
    // Uso un if per evitare di triggerare un re-render ogni mezzo secondo
    if (socket.connected !== connected)
      setConnected(socket.connected);
  }, 500);

  return (
    <p style={{ color: connected ? 'green' : 'red' }}>
      {'\u25CF\u0020'}{connected ? 'connesso' : 'non connesso'}
    </p>
  );
};
