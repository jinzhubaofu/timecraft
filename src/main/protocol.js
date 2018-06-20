/**
 * @file 处理 protocal
 * @author leon <ludafa@outlook.com>
 */

import {protocol} from 'electron';
import {APP_NAME} from '../common/constants';

export default function () {

    protocol.registerFileProtocol(APP_NAME, (request, callback) => {

        console.log('real file:', request.url.substr(APP_NAME.length + 3));

        callback({
            path: request.url.substr(APP_NAME.length + 3)
        });

    });

}
