import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
ReactDOM.render(
  <Provider
    store={createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);
