/**
 * @file app
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import thunk from 'redux-thunk';

import reducer from './reducer';
import App from './component/App';
import createInterface from './util/createInterface';
import {WEB_CONTENTS_INTERFACE} from '../common/constants';
import './main.styl';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(
        require('redux-logger')({
            collapsed: true,
            logErrors: false
        })
    );
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.querySelector('#main')
    );
}

render(App);


// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./component/App', () => {
        render(App);
    });
}

// 给 main 的接口
window[WEB_CONTENTS_INTERFACE] = createInterface(store);
