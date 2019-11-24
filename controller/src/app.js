import React from 'react';
import { ControllerScreen } from './ControllerScreen';
import { ConnectionIndicator } from './ConnectionIndicator';
import { socket } from './socket';
import { EndGameScreen } from './EndGameScreen';

export const App = () => {
  const [game, setGame] = React.useState({ status: 'waiting', side: '', endGameData: {} });

  const startGame = ({ side }) =>
    setGame({
      ...game,
      status: 'playing',
      side,
    });

  const endGame = data =>
    setGame({
      ...game,
      status: 'end',
      endGameData: data,
    });

  React.useEffect(() => {
    socket.on('startGame', startGame);
    socket.on('endGame', endGame);

    return () => {
      socket.off('startGame', startGame);
      socket.off('endGame', endGame);
    };
  });

  switch (game.status) {
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
            side={game.side}
          />
        </React.Fragment>
      );

    case 'end':
      return (
        <EndGameScreen
          side={game.side}
          data={game.endGameData}
        />
      );
  }
};
