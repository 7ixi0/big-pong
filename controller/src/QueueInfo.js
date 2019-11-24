import React from 'react';
import { socket } from './socket';

export const QueueInfo = () => {
  const [data, setData] = React.useState({ length: 0, position: 0 });

  React.useEffect(() => {
    socket.on('queueInfo', setData);

    return () => socket.off('queueInfo', setData);
  });

  const { position } = data;
  return (
    <React.Fragment>
      <p>Posizione in coda: {position + 1}</p>
      {position < 1 && <p>Sarai nella prossima partita</p>}
    </React.Fragment>
  );
};
