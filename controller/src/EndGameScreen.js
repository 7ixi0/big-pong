import React from 'react';
import PropTypes from 'prop-types';

export const EndGameScreen = ({ side, data }) => {
  if (!data) return (
    <p>Connessione interrota: la partita è stat cancellata</p>
  );

  console.log(data);
  const { winner, points } = data;
  return (
    <React.Fragment>
      <p style={{ color: side === winner ? 'green' : 'red' }}>
        Hai {side === data.winner ? 'vinto' : 'perso'}
      </p>
      <p>{points.left} - {points.right}</p>
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
