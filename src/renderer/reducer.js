/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionTypes.js';
import update from 'react-addons-update';

const INITIAL_STATE = {
    value: '',
    fontSize: 16
};

export default function (state = INITIAL_STATE, action) {

    const {
        type,
        payload
    } = action;

    switch (type) {

        case types.ZOOM_IN:
            return update(state, {
                fontSize: {
                    $apply(fontSize) {
                        return fontSize > 8 ? fontSize - 1 : 8;
                    }
                }
            });

        case types.ZOOM_OUT:
            return update(state, {
                fontSize: {
                    $apply(fontSize) {
                        return fontSize + 1;
                    }
                }
            });

        case types.ZOOM_TO:
            return update(state, {
                fontSize: {
                    $set: payload
                }
            });

        case types.EDITOR_UPDATE_VALUE:
            return update(state, {
                value: {
                    $set: payload
                }
            });

        default:
            return state;

    }

}
