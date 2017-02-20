/**
 * @file create interface
 * @author leon <ludafa@outlook.com>
 */

import * as actions from '../actions';


export default function (store) {

    return {
        getEditorContent() {
            return Promise.resolve(store.getState().value);
        },

        zoomIn() {
            store.dispatch(actions.zoomIn());
        },

        zoomOut() {
            store.dispatch(actions.zoomOut());
        },

        zoomTo(fontSize) {
            store.dispatch(actions.zoomTo(fontSize));
        },
        setTitle(title) {
            console.log(`setting name title: ${title}`);
            document.title = title;
        },
        setContent(content) {
            store.dispatch(actions.updateEditorValue(content));
        }
    };

}


/* eslint-disable fecs-prefer-class */
/**
 * Test
 *
 * @class
 */
export function Test() {

}
