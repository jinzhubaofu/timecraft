/**
 * @file actions
 * @author leon <ludafa@outlook.com>
 */

import * as types from './actionTypes';
import {getScrollState} from './selector';

export function zoomIn() {
}

export function zoomTo(value) {
}

export function zoomOut() {
}

export function updateFile(file, content) {
    return {
        type: types.UPDATE_FILE,
        payload: {
            file,
            value: content
        }
    };
}

export function updateEditorValue(value) {

    return {
        type: types.EDITOR_UPDATE_VALUE,
        payload: value
    };

}

export function updateEditorScrollData({start, stop, top, bottom, lineCount}) {

    return (dispatch, getState) => {

        let scrollState = getScrollState(getState()) || {};

        if (start === scrollState.start && stop === scrollState.stop) {
            return;
        }

        let direction = start - scrollState.start + stop - scrollState.stop > 0
            ? 'down' : 'up';

        dispatch({
            type: types.EDITOR_UPDATE_SCROLL_DATA,
            payload: {
                direction,
                start,
                stop,
                top,
                bottom,
                lineCount
            }
        });

    };

}
