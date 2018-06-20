/**
 * @file file actions
 * @author leon <ludafa@outlook.com>
 */

import * as window from './window';
import {dialog} from 'electron';
import path from 'path';
import fs from 'fs';
import {
    getEditorContent,
    setTitle,
    updateFile
} from '../web';

export function open() {

    const options = {
        filters: [
            {
                name: 'markdown',
                extensions: ['md', 'markdown']
            }
        ],
        properties: ['openFile', 'showHiddenFiles']
    };

    let currentWindow = window.getCurrentWindow();
    let files = currentWindow
        ? dialog.showOpenDialog(currentWindow, options)
        : dialog.showOpenDialog(options);

    if (!files || !files.length) {
        return;
    }

    let file = files[0];

    if (!currentWindow) {
        window.create(file);
        return;
    }

    getEditorContent(currentWindow).then(content => {
        if (content) {
            window.create(file);
            return;
        }
        updateFile(currentWindow, file, fs.readFileSync(file, 'utf8'));
    });

}

export function save(menuItem, win, event) {

    if (!win) {
        return;
    }

    let filename = win.filename;

    if (!filename) {

        filename = dialog.showSaveDialog(
            window.getCurrentWindow(),
            {
                filters: [
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ],
                properties: ['openFile']
            }
        );

    }

    if (!filename) {
        return;
    }

    win.filename = filename;

    getEditorContent(win).then(content => {

        const title = path.basename(filename);

        console.log(`saving ${filename}...title: ${title}`);

        fs.writeFileSync(filename, content, 'utf8');
        win.setTitle(title);
        setTitle(win, title);
    });

}
