import React from 'react';
import { socket } from './socket';

export const ConnectionIndicator = () => {
  const [connected, setConnected] = React.useState(socket.connected);
  const setOnline = () => setConnected(true);
  const setOffline = () => setConnected(false);

  React.useEffect(() => {
    socket.on('connect', setOnline);
    socket.on('disconnect', setOffline);

    return () => {
      socket.off('connect', setOnline);
      socket.off('disconnect', setOffline);
    };
  });

  return (
    <p style={{ color: connected ? 'green' : 'red' }}>
      {'\u25CF\u0020'}{connected ? 'connesso' : 'non connesso'}
    </p>
  );
};
