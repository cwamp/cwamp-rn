/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import App from './src/pages/App';

import {name as appName} from './app.json';
import store from './src/store';

const StoreWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => StoreWrapper);
