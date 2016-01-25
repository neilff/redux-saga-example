/*eslint-disable */
import { call, take, put } from 'redux-saga';
import productMock from '../../productMock.json';

import { REQUEST_START, requestSuccess, requestComplete } from '../reducers/products';
import { showLoadingModal, hideLoadingModal } from '../reducers/loading';

// Example success request
const getProducts = delay => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productMock), delay);
  });
};

// Example error request
const getBadProducts = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Invalid request');
    }, delay);
  });
};

function *requestProducts() {
  while (yield take(REQUEST_START) ) {

    // When the request starts, trigger the global loading modal
    yield put(showLoadingModal());

    try {
      // Attempt to request products from our mock endpoint
      const response = yield call(getProducts, 2000);

      // On success, inform the reducer
      yield put(requestSuccess(response));
    } catch (error) {

      // On error, let's handle it
      alert(error);
    } finally {

      // And finally clean up after ourselves
      yield put(hideLoadingModal());
      yield put(requestComplete());
    }
  }
}

export default requestProducts;
/*eslint-enable */
