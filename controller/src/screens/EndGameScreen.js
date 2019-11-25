import React from 'react';
import PropTypes from 'prop-types';
import '../styles/end-screen.css';

export const EndGameScreen = ({ side, data }) => {
  if (!data) return (
    <p>Connessione interrota: la partita è stata cancellata</p>
  );

  console.log(data);
  const { winner, points } = data;
  return (
    <React.Fragment>
      <p className={`game-result ${side === winner ? 'win' : 'lose'}`}>
        Hai {side === data.winner ? 'vinto' : 'perso'}
      </p>
      <p className="points">
        {points.left} - {points.right}
      </p>
      <p className="bottom-text">
        Ricarica la pagina per fare un'altra partita
      </p>
    </React.Fragment>
  );
};

EndGameScreen.propTypes = {
  side: PropTypes.string.isRequired,
  data: PropTypes.shape({
    winner: PropTypes.string.isRequired,
    points: PropTypes.shape({
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
    }),
  }),
};
