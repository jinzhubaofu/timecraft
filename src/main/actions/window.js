/**
 * @file window actions
 * @author leon <ludafa@outlook.com>
 */

import {BrowserWindow, dialog} from 'electron';
import fs from 'fs';
import path from 'path';

import {updateFile} from '../web';

let wins = [];
let currentWin = null;


export function getCurrentWindow() {
    return currentWin;
}

export function getCount() {
    return wins.length;
}

export function create(file = '') {

    let content = '';

    if (file) {

        try {
            content = fs.readFileSync(file, 'utf8');
        }
        catch (e) {
            dialog.showMessageBox({
                type: 'error',
                message: '抱歉，无法打开文件'
            });
            return;
        }

    }

    let win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });

    win.setTitle(file ? file : 'Untitled');
    win.file = file;

    if (process.env.NODE_ENV === 'production') {
        win.loadURL(path.join(__dirname, '../renderer/index.html'));
    }
    else {
        win.loadURL('http://localhost:8080');
    }

    const webContents = win.webContents;

    webContents.once('did-finish-load', () => {
        updateFile(win, file, content);
    });

    win.once('ready-to-show', () => {
        win.show();
        if (process.env.NODE_ENV !== 'production') {
            win.webContents.openDevTools();
        }
    });

    win.on('closed', () => {
        wins = wins.filter(w => w !== win);
        if (currentWin === win) {
            currentWin = null;
        }
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
