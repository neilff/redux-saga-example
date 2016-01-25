import React from 'react';
import { connect } from 'react-redux';

import { start, stop, reset } from '../reducers/counter';

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: () => dispatch(start()),
    onStop: () => dispatch(stop()),
    onReset: () => dispatch(reset()),
  };
}

const App = ({ counter, onStart, onStop, onReset }) => {
  return (
    <div className="container">
      <h1>{ counter.get('count') }</h1>

      <button
        disabled={ counter.get('isRunning') }
        onClick={ onStart }
        className="m1 btn btn-primary">Start</button>

      <button
        disabled={ !counter.get('isRunning') }
        onClick={ onStop }
        className="m1 btn btn-primary">Stop</button>

      <button
        disabled={ counter.get('isRunning') }
        onClick={ onReset }
        className="m1 btn btn-primary">Reset</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
