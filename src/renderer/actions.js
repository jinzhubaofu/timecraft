/**
 * @file actions
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionTypes';

export function zoomIn() {
}

export function zoomTo(value) {
}

export function zoomOut() {
}

export function updateEditorValue(value) {

    return {
        type: types.EDITOR_UPDATE_VALUE,
        payload: value
    };

}
