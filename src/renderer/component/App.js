/**
 * @file App
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import Editor from '../container/Editor';
import styles from './App.css';
import Preview from '../container/Preview';

export default class App extends Component {

    render() {

        return (
            <main className={styles.app}>
                <Editor />
                <Preview />
            </main>
        );

    }

}
