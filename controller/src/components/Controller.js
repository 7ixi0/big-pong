import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { map } from '../util';
import { socket } from '../socket';
import { useInterval } from '../hooks/useInterval';
import '../styles/controller.css';

export const Controller = ({ side }) => {
  const controllerDiv = React.useRef();
  const [bounds, setBounds] = React.useState();
  const [range, setRange] = React.useState();

  React.useEffect(() => {
    const { top, bottom } = controllerDiv.current.getBoundingClientRect();

    const range = bottom - top - 150; // 150 è l'altezza della paletta
    setRange(bottom - top - 150);

    // I bounds del <Draggable> sono relativi a quanto può muoversi in ogni direzione,
    // quindi dobbiamo considerare che parte dall'angolo in alto a sinistra
    setBounds({
      left: 0,
      right: 0,
      top: 0,
      bottom: range,
    });
  }, [controllerDiv]);

  // Questa roba con le variabili va contro tutte le good practices di React,
  // però è il modo più performante che ho trovato quindi andrà bene così
  let value = 0;
  let lastValue = 0;
  useInterval(() => {
    if (value === lastValue) return;
    lastValue = value;

    const position = map(value, 0, range, 0, 1);
    socket.emit('movePaddle', { position });
  }, 5);

  return (
    <React.Fragment>
      <p className={`controller-side ${side}`}>
        LATO {side === 'left' ? 'SINISTRO' : 'DESTRO'}
      </p>
      <div ref={controllerDiv} className={`controller ${side}`}>
        <Draggable
          axis="y"
          bounds={bounds}
          onDrag={(_event, position) => {
            value = position.y;
          }}
        >
          <div className="controller-paddle" />
        </Draggable>
      </div>
    </React.Fragment>
  );
};

Controller.propTypes = {
  side: PropTypes.string.isRequired,
};
