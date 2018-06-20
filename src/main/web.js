/**
 * @file ipc
 * @author leon <ludafa@outlook.com>
 */

import {
    WEB_CONTENTS_INTERFACE
} from '../common/constants';

function execute(win, method, ...args) {
    args = args.map(arg => JSON.stringify(arg)).join(' ,');
    const code = `window.${WEB_CONTENTS_INTERFACE}.${method}(${args})`;
    return win.webContents.executeJavaScript(code, true);
}

export function getEditorContent(win) {
    return execute(win, 'getEditorContent');
}

export function setTitle(win, title) {
    return execute(win, 'setTitle', title);
}

export function setContent(win, content) {
    return execute(win, 'setContent', content);
}

export function updateFile(win, path, content) {
    return execute(win, 'updateFile', path, content);
}
