import React from 'react';
import { QueueInfo } from './QueueInfo';
import { ConnectionIndicator } from './ConnectionIndicator';

export const WaitingScreen = () => {
  return (
    <React.Fragment>
      <ConnectionIndicator />
      <QueueInfo />
      <p>In coda per entrare in partita...</p>
    </React.Fragment>
  );
};
