import { fromJS } from 'immutable';

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';

const initialState = fromJS({
  result: [],
  isLoading: false,
});

function productReducer(state = initialState, action = {}) {
  switch (action.type) {

  case REQUEST_START:
    return state.set('isLoading', true);

  case REQUEST_SUCCESS:
    return state.merge(fromJS({
      result: action.payload,
    }));

  case REQUEST_COMPLETE:
    return state.merge(fromJS({
      isLoading: false,
    }));

  default:
    return state;
  }
}

export default productReducer;

export function requestProducts() {
  return { type: REQUEST_START };
}

export function requestSuccess(result) {
  return { type: REQUEST_SUCCESS, payload: result };
}

export function requestComplete() {
  return { type: REQUEST_COMPLETE };
}
