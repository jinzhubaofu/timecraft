/**
 * @file actions
 * @author leon <ludafa@outlook.com>
 */

import {BrowserWindow, dialog} from 'electron';

import fs from 'fs';
import path from 'path';

import {
    getEditorContent,
    setTitle,
    setContent
} from './web';

let wins = [];
let currentWin = null;

const window = {

    getCount() {
        return wins.length;
    },

    create(filename) {

        let title;
        let content = '';

        if (filename) {

            try {
                content = fs.readFileSync(filename, 'utf8');
            }
            catch (e) {
                dialog.showMessageBox({
                    type: 'error',
                    message: '抱歉，无法打开文件'
                });
                return;
            }

        }

        // Create the browser window.
        let win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false
        });

        title = filename ? path.basename(filename) : 'Untitled';

        win.setTitle(title);
        win.filename = filename || '';

        if (process.env.NODE_ENV === 'development') {
            win.loadURL('http://localhost:8080');
        }
        else {
            win.loadURL(path.join(__dirname, '../renderer/index.html'));
        }

        const webContents = win.webContents;

        webContents.once('did-finish-load', () => {
            setTitle(win, title);
            if (content) {
                setContent(win, content);
            }
        });

        win.once('ready-to-show', () => {

            win.show();

            if (process.env.NODE_ENV === 'development') {
                win.webContents.openDevTools();
            }

        });

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            wins = wins.filter(w => w !== win);
        });

        win.on('focus', () => {
            currentWin = win;
        });

        win.on('blur', () => {
            currentWin = null;
        });

        wins.push(win);

        return win;

    }
};

const file = {
    create(menuItem, win, event) {
        window.create();
    },
    open() {

        const options = {
            filters: [
                {
                    name: 'markdown',
                    extensions: ['md', 'markdown']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ],
            properties: ['openFile', 'showHiddenFiles']
        };

        let filename = currentWin
            ? dialog.showOpenDialog(options)
            : dialog.showOpenDialog(currentWin, options);

        if (!filename || !filename.length) {
            return;
        }

        filename = filename[0];

        if (currentWin) {
            getEditorContent(currentWin).then(content => {

                if (content) {
                    window.create(filename);
                    return;
                }

                setTitle(currentWin, path.basename(filename));
                setContent(currentWin, fs.readFileSync(filename, 'utf8'));

            });
            return;
        }

        window.create(filename);

    },
    save(menuItem, win, event) {

        if (!win) {
            return;
        }

        let filename = win.filename;

        if (!filename) {

            filename = dialog.showSaveDialog(
                currentWin,
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


        //
        // if (savePath) {
        //     getEditorContent(win).then(content => {
        //         fs.writeFileSync(savePath, content, 'utf8');
        //     });
        // }

    }
};

module.exports = {
    window,
    file
};
