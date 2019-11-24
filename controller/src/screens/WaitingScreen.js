import React from 'react';
import { QueueInfo } from '../components/QueueInfo';
import { ConnectionIndicator } from '../components/ConnectionIndicator';

export const WaitingScreen = () => {
  return (
    <React.Fragment>
      <ConnectionIndicator />
      <QueueInfo />
      <p>In coda per entrare in partita...</p>
    </React.Fragment>
  );
};
