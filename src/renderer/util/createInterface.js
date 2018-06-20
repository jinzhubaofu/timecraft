/**
 * @file create interface
 * @author leon <ludafa@outlook.com>
 */

import * as actions from '../actions';

export default function (store) {

    return Object
        .keys(actions)
        .reduce((iface, actionName) => {
            iface[actionName] = (...args) => store.dispatch(actions[actionName](...args));
            return iface;
        }, {
            getEditorContent() {
                return Promise.resolve(store.getState().value);
            }
        });

}
