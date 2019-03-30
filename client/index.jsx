import '@babel/polyfill';
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
