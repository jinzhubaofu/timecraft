/**
 * @file reducer
 * @author leon <ludafa@outlook.com>
 */

import {combineReducer} from 'redux';
import file from './file';
import scroll from './scroll';
import settings from './settings';

export default combineReducer({
    file,
    scroll,
    settings
});
