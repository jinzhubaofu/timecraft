/**
 * @file app
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import './main.css';
import reducer from './reducer';
import createInterface from './util/createInterface';
import {WEB_CONTENTS_INTERFACE} from '../common/constants';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {

    middlewares.push(
        require('redux-logger')({
            collapsed: true
        })
    );

}

const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#main')
);

// 给 main 的接口
window[WEB_CONTENTS_INTERFACE] = createInterface(store);
