import React from 'react';
import { ControllerScreen } from './ControllerScreen';
import { ConnectionIndicator } from './ConnectionIndicator';
import { socket } from './socket';
import { EndGameScreen } from './EndGameScreen';

export const App = () => {
  const [side, setSide] = React.useState('');
  const [gameStatus, setGameStatus] = React.useState('waiting');
  const [endGameData, setEndGameData] = React.useState({});
  const startGame = ({ side }) => {
    setSide(side);
    setGameStatus('playing');
  };
  const endGame = data => {
    setEndGameData(data);
    setGameStatus('end');
  };

  React.useEffect(() => {
    socket.on('startGame', startGame);
    socket.on('endGame', endGame);

    return () => {
      socket.off('startGame', startGame);
      socket.off('endGame', endGame);
    };
  });

  switch (gameStatus) {
    case 'waiting':
      return (
        <React.Fragment>
          <ConnectionIndicator />
          <p>In coda per entrare in partita...</p>
        </React.Fragment>
      );

    case 'playing':
      return (
        <React.Fragment>
          <ConnectionIndicator />
          <ControllerScreen
            side={side}
          />
        </React.Fragment>
      );

    case 'end':
      return (
        <EndGameScreen
          side={side}
          data={endGameData}
        />
      );
  }
};
