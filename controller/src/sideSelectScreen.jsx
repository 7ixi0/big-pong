import React from 'react';
import PropTypes from 'prop-types';

export const SideSelectScreen = ({ selectedSideCb }) => (
  <React.Fragment>
    <button onClick={() => selectedSideCb('left')}>Sinistra</button>
    <button onClick={() => selectedSideCb('right')}>Destra</button>
  </React.Fragment>
);

SideSelectScreen.propTypes = {
  selectedSideCb: PropTypes.func.isRequired,
};
