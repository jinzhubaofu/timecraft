/**
 * @file 粘贴板
 * @author leon <ludafa@outlook.com>
 */

import {clipboard} from 'electron';
import os from 'os';
import fs from 'fs';
import path from 'path';
import {APP_NAME} from '../constants';
import mkdirp from 'mkdirp';

export function saveImage(dirPath = os.tmpdir()) {

    let image = clipboard.readImage();

    if (!image || image.isEmpty()) {
        return;
    }

    let buffer = image.toPNG();
    let name = (+(Math.random() + '').substr(2, 16)).toString(36);

    mkdirp.sync(path.join(dirPath, APP_NAME));

    let imagePath = path.join(dirPath, APP_NAME, `${name}.png`);

    fs.writeFileSync(imagePath, buffer);

    return imagePath;

}
