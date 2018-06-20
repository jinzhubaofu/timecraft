/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionTypes.js';
import update from 'react-addons-update';
import sample from '../../data/sample.md';
import yaml from 'yaml';

const INITIAL_STATE = {
    value: sample,
    fontSize: 16,
    scroll: null
};

function updateFileContent(state, {payload}) {

    let match = /^\s*---\n([\w\W]+)\n---([\w\W]*)/.exec(payload);
    let meta = null;

    if (match) {

        try {
            meta = yaml.eval(match[1]);
            payload = match[2];
        }
        catch (e) {
        }

    }

    return update(state, {
        value: {
            $set: payload
        },
        meta: {
            $set: meta
        }
    });

}

export default function (state = INITIAL_STATE, action) {

    let {
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
            return updateFileContent(state, action);


        case types.EDITOR_UPDATE_SCROLL_DATA:
            return update(state, {
                scroll: {$set: payload}
            });

        case types.UPDATE_FILE:

            document.title = payload.file;

            return update(
                updateFileContent(state, action),
                {
                    $set: payload.file
                }
            );

        default:
            return state;

    }

}
