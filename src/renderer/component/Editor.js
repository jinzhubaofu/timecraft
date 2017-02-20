/**
 * @file Editor
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/selection/mark-selection';

import styles from './Editor.css';

// import {
//     scrollPreview,
//     onPreviewScroll
// } from './ScrollSync';

export default class Editor extends Component {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

        const {value} = this.props;

        CodeMirror.mimeModes = Object
            .keys(CodeMirror.mimeModes)
            .reduce((modes, mime) => {

                const mode = CodeMirror.mimeModes[mime];

                if (mode === 'javascript') {
                    modes[mime] = 'jsx';
                }
                else if (
                    typeof mode === 'object'
                    && mode.name === 'javascript'
                ) {

                    modes[mime] = {
                        ...mode,
                        name: 'jsx'
                    };

                }
                else {
                    modes[mime] = mode;
                }

                return modes;

            }, {});

        console.log(CodeMirror.mimeModes);

        const cm = new CodeMirror(this.refs.main, {
            value,
            mode: {
                name: 'gfm',
                tokenTypeOverrides: {
                    list1: 'list-1',
                    list2: 'list-2',
                    list3: 'list-3',
                    code: 'code'
                },
                highlightFormatting: true
            },
            indentUnit: 4,
            lineNumbers: false,
            lineWrapping: true,
            indentWithTabs: false,
            theme: 'one-dark'
        });

        cm.on('change', this.onChange);

        // let syncScrolling = false;

        // cm.on('scroll', () => {
        //
        //     if (syncScrolling) {
        //         syncScrolling = false;
        //         return;
        //     }
        //
        //     const doc = cm.getDoc();
        //
        //     const total = doc.lineCount();
        //
        //     const {
        //         top,
        //         clientHeight,
        //         height
        //     }  = cm.getScrollInfo();
        //
        //     const lineHeight = cm.defaultTextHeight();
        //
        //     const begin = cm.lineAtHeight(top, 'local');
        //     const end = cm.lineAtHeight(top + clientHeight, 'local');
        //
        //     scrollPreview({
        //         begin,
        //         end,
        //         lineHeight,
        //         clientHeight,
        //         height,
        //         total
        //     });
        //
        // });

        cm.addKeyMap({
            'Tab'(cm) {

                if (cm.somethingSelected()) {
                    cm.indentSelection('add');
                    return;
                }

                const selection = cm.getOption('indentWithTabs')
                    ? '\t'
                    : Array(cm.getOption('indentUnit') + 1).join(' ');

                cm.replaceSelection(selection, 'end', '+input');

            },
            'Shift-Tab'(cm) {
                cm.indentSelection('subtract');
            }
        });

        // onPreviewScroll(line => {
        //     syncScrolling = true;
        //     cm.scrollTo(0, cm.heightAtLine(line, 'local'));
        // });

        this.cm = cm;
    }

    componentWillReceiveProps(nextProps) {

        const cm = this.cm;

        const {
            value,
            preservePosition
        } = nextProps;

        if (
            cm
            && value !== void 0
            && value !== cm.getValue()
        ) {

            if (preservePosition) {
                const {
                    left,
                    top
                } = cm.getScrollInfo();
                cm.setValue(value);
                cm.scrollTo(left, top);
            }
            else {
                cm.setValue(value);
            }

        }

    }

    componentWillUnmount() {
        if (this.cm) {
            this.cm.toTextArea();
            this.cm = null;
        }
    }

    onChange(cm, meta) {

        const onChange = this.props.onChange;

        if (onChange && meta.origin !== 'setValue') {
            onChange(cm.getDoc().getValue(), meta);
        }

    }

    render() {

        return (
            <div
                ref="main"
                style={{
                    fontSize: this.props.fontSize
                }}
                className={styles.editor} />
        );
    }

}

Editor.propTypes = {
    value: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};
