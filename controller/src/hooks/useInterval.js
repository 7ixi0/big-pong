import React from 'react';

export const useInterval = (cb, time) =>
  React.useEffect(() => {
    const interval = setInterval(cb, time);
    return () => clearInterval(interval);
  });
