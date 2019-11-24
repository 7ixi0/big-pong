import React from 'react';
import { socket } from '../socket';
import '../styles/queue-info.css';

export const QueueInfo = () => {
  const [data, setData] = React.useState({ length: 0, position: 0 });

  React.useEffect(() => {
    socket.on('queueInfo', setData);

    return () => socket.off('queueInfo', setData);
  });

  const { position } = data;
  return (
    <div className="queue-info-container">
      <p className="queue-postion">Posizione in coda: {position + 1}</p>
      {position < 1 && <p className="in-next-game">Sarai nella prossima partita</p>}
    </div>
  );
};
