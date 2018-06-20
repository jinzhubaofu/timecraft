/**
 * @file App
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import Editor from '../container/Editor';
import Preview from '../container/Preview';

export default class App extends Component {

    render() {

        return (
            <div className="app">
                <Editor />
                <Preview />
            </div>
        );

    }

}
