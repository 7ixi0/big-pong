import React from 'react';
import { socket } from './socket';
import { WaitingScreen } from './WaitingScreen';
import { ControllerScreen } from './ControllerScreen';
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
      return <WaitingScreen />;

    case 'playing':
      return (
        <ControllerScreen
          side={game.side}
        />
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
