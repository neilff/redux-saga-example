import { fromJS } from 'immutable';

const TICK = 'TICK';
const START = 'START';
const STOP = 'STOP';
const RESET = 'RESET';

const initialState = fromJS({
  count: 0,
  isRunning: false,
});

function counterReducer(state = initialState, action = {}) {
  switch (action.type) {

  case START:
    return state.set('isRunning', true);

  case STOP:
    return state.set('isRunning', false);

  case TICK:
    return state.update('count', (value) => value + 1);

  case RESET:
    return state.merge(initialState);

  default:
    return state;
  }
}

export default counterReducer;

export function start() {
  return { type: START };
}

export function stop() {
  return { type: STOP };
}

export function reset() {
  return { type: RESET };
}

export function tick() {
  return { type: TICK };
}
