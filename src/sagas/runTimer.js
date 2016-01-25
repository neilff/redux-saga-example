import { call, take, put } from 'redux-saga';

import { tick } from '../reducers/counter';

const ONE_SECOND = 1000;

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
);

function* runTimer(getState) {
  console.log('here');
  // Wake up when user starts timer.
  while (yield take('START')) {
    while (true) {
      // This side effect is not run yet, so it can be treated
      // as data, making it easier to test if needed.
      yield call(wait, ONE_SECOND);

      // Check if the timer is still running.
      // If so, then dispatch a TICK.
      if (getState().counter.get('isRunning')) {
        yield put(tick());
        // Otherwise, go idle until user starts the timer again.
      } else {
        break;
      }
    }
  }
}

export default runTimer;
