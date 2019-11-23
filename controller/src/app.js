import React from 'react';
import { SideSelectScreen } from './sideSelectScreen';
import { ControllerScreen } from './ControllerScreen';

export const App = () => {
  const [side, setSide] = React.useState('');

  return side === ''
    ? (
      <SideSelectScreen
        selectedSideCb={side => setSide(side)}
      />
    ) : (
      <ControllerScreen
        side={side}
      />
    );
};
