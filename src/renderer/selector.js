/**
 * @file selector
 * @author leon <ludafa@outlook.com>
 */

import {createSelector} from 'reselect';

export const getEditorValue = state => state.value;
export const getRootFontSize = state => state.fontSize;
export const getScrollState = state => state.scroll;
export const getFileState = state => {
    let {meta, file} = state;
    return {
        meta,
        file
    };
};

export const getEditorState = createSelector(
    getEditorValue,
    getRootFontSize,
    (value, fontSize) => ({value, fontSize})
);

export const getPreviewState = createSelector(
    getEditorValue,
    getRootFontSize,
    getScrollState,
    getFileState,
    (value, fontSize, scroll, file) => ({value, fontSize, scroll, file})
);
