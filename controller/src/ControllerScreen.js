import React from 'react';
import PropTypes from 'prop-types';
import { ConnectionIndicator } from './ConnectionIndicator';
import { Controller } from './Controller';

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
