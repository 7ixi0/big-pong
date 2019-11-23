import React from 'react';
import { SideSelectScreen } from './sideSelectScreen';
import { ControllerScreen } from './ControllerScreen';
import { ConnectionIndicator } from './ConnectionIndicator';

export const App = () => {
  const [side, setSide] = React.useState('');

  return (
    <React.Fragment>
      <ConnectionIndicator />
      {side === ''
        ? (
          <SideSelectScreen
            selectedSideCb={side => setSide(side)}
          />
        ) : (
          <ControllerScreen
            side={side}
          />
        )}
    </React.Fragment>
  );
};
