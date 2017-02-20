/**
 * @file selector
 * @author leon <ludafa@outlook.com>
 */

import {createSelector} from 'reselect';

export const getEditorValue = state => state.value;
export const getRootFontSize = state => state.fontSize;

export const getEditorState = createSelector(
    getEditorValue,
    getRootFontSize,
    (value, fontSize) => ({value, fontSize})
);

export const getPreviewState = createSelector(
    getEditorValue,
    getRootFontSize,
    (value, fontSize) => ({value, fontSize})
);
