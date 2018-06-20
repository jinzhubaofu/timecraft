/**
 * @file 开发者工具
 * @author leon <ludafa@outlook.com>
 */

import {app, BrowserWindow} from 'electron';
import path from 'path';

const EXTENION_BASE = path.join(
    process.env.HOME,
    'Library/Application Support/Google/Chrome/Default/Extensions'
);

const EXTENSIONS = [
    {
        name: 'redux-devtool',
        id: 'lmhkpmbekcpmknklioeibfkpmmfibljd',
        version: '2.14.1_0'
    },
    {
        id: 'fmkadmapgofadopljbjfkapdkoienihi',
        name: 'react-devtool',
        version: '2.0.12_0'
    }
];

if (process.env.NODE_ENV !== 'production') {

    app.on('ready', () => {

        EXTENSIONS.forEach(extenstion => {

            let {
                id,
                version
            } = extenstion;

            BrowserWindow.addDevToolsExtension(
                path.join(`${EXTENION_BASE}/${id}/${version}`)
            );

        });

    });
}
