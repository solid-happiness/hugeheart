import '@babel/polyfill';
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
