/**
 * @file Editor
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import CodeMirror from 'codemirror';
import styles from './Editor.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/markdown/markdown.js';
import './code-mirror.css';

import {
    scrollPreview,
    onPreviewScroll
} from './ScrollSync';

export default class Editor extends Component {

    componentDidMount() {

        let syncScrolling = false;

        const cm = new CodeMirror(this.refs.main, {
            value: this.props.value,
            mode: 'markdown',
            indentUnit: 4,
            lineNumbers: false,
            lineWrapping: true,
            indentWithTabs: false
        });

        cm.on('change', () => {
            this.props.onChange(cm.getDoc().getValue());
        });

        cm.on('scroll', () => {

            if (syncScrolling) {
                syncScrolling = false;
                return;
            }

            const doc = cm.getDoc();

            const total = doc.lineCount();

            const {
                top,
                clientHeight,
                height
            }  = cm.getScrollInfo();

            const lineHeight = cm.defaultTextHeight();

            const begin = cm.lineAtHeight(top, 'local');
            const end = cm.lineAtHeight(top + clientHeight, 'local');

            scrollPreview({
                begin,
                end,
                lineHeight,
                clientHeight,
                height,
                total
            });

        });

        cm.addKeyMap({
            'Tab': cm => {

                if (cm.somethingSelected()) {
                    cm.indentSelection('add');
                    return;
                }

                const selection = cm.getOption('indentWithTabs')
                    ? '\t'
                    : Array(cm.getOption('indentUnit') + 1).join(' ');

                cm.replaceSelection(selection, 'end', '+input');

            },
            'Shift-Tab': cm => {
                cm.indentSelection('subtract');
            }
        });

        onPreviewScroll(line => {
            syncScrolling = true;
            cm.scrollTo(0, cm.heightAtLine(line, 'local'));
        });

        this.cm = cm;
    }

    render() {
        return (
            <div ref="main" className={styles.editor}></div>
        );
    }

}

Editor.propTypes = {
    onChange: PropTypes.func
};
