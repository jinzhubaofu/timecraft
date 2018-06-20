/**
 * @file 设置相关的 reducer
 * @author leon <ludafa@outlook.com>
 */

import * as types from '../actionTypes';
import update from 'react-addons-update';

const DEFAULT_SETTINGS = {
    fontSize: 16
};

export default function (state = DEFAULT_SETTINGS, action) {

    let {type, payload} = action;

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

        default:
            return state;

    }

}
