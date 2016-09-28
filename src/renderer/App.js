/**
 * @file app
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import Editor from './Editor.js';
import Preview from './Preview.js';
import markdown from 'markdown-it';
import styles from './App.css';
import text from './example.md';

export default class App extends Component {

    constructor(...args) {
        super(...args);
        this.markdown = markdown();
        this.state = {
            value: text
        };
    }

    render() {

        const value = this.state.value;

        return (
            <div className={styles.app}>
                <Editor
                    value={value}
                    onChange={value => this.setState({value})} />
                <Preview value={value} />
            </div>
        );

    }

}
