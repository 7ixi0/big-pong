import React from 'react';
import { QueueInfo } from '../components/QueueInfo';
import { ConnectionIndicator } from '../components/ConnectionIndicator';

export const WaitingScreen = () => {
  return (
    <React.Fragment>
      <ConnectionIndicator />
      <QueueInfo />
    </React.Fragment>
  );
};
