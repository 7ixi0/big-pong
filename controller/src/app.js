import React from 'react';
import { ControllerScreen } from './ControllerScreen';
import { ConnectionIndicator } from './ConnectionIndicator';
import { socket } from './socket';

export const App = () => {
  const [side, setSide] = React.useState('');
  
  React.useEffect(() => {
    const startGame = ({ side }) => setSide(side);
    socket.on('startGame', startGame);

    return () => socket.off('startGame', startGame);
  });

  return (
    <React.Fragment>
      <ConnectionIndicator />
      {side === ''
        ? (
          <p>In coda per entrare in partita...</p>
        ) : (
          <ControllerScreen
            side={side}
          />
        )}
    </React.Fragment>
  );
};
