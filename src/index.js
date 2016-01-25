import 'babel-polyfill';

import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Products from './containers/Products';

import configureStore from './store/configureStore';

const store = configureStore({});

ReactDOM.render(
  <div>
    <Provider store={ store }>
      <Products />
    </Provider>
  </div>,
  document.getElementById('root')
);

