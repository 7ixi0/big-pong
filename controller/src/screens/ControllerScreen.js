import React from 'react';
import PropTypes from 'prop-types';
import { ConnectionIndicator } from '../components/ConnectionIndicator';
import { Controller } from '../components/Controller';

export const ControllerScreen = ({ side }) => {
  return (
    <>
      <ConnectionIndicator />
      <Controller
        side={side}
      />
    </>
  );
}

ControllerScreen.propTypes = {
  side: PropTypes.string.isRequired,
};
