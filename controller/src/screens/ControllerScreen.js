import React from 'react';
import PropTypes from 'prop-types';
import { ConnectionIndicator } from '../components/ConnectionIndicator';
import { Controller } from '../components/Controller';

export const ControllerScreen = ({ side }) => {
  return (
    <React.Fragment>
      <ConnectionIndicator />
      <Controller
        side={side}
      />
    </React.Fragment>
  );
}

ControllerScreen.propTypes = {
  side: PropTypes.string.isRequired,
};
