/**
 * @file Editor
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import CodeMirror from 'codemirror';
import {throttle} from 'lodash';
import {clipboard, remote} from 'electron';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/selection/mark-selection';

export default class Editor extends Component {

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

        const {value, onScroll} = this.props;

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
            // lineNumbers: true,
            lineWrapping: true,
            indentWithTabs: false,
            theme: 'one-dark',
            smartIndent: true
        });

        cm.on('change', this.onChange);

        // let syncScrolling = false;

        function getStartLineInfo(scrollInfo) {

            let line = cm.lineAtHeight(0);

            let position = cm.charCoords({
                line,
                ch: 0
            });

            while (position.top < 16) {
                line++;
                position = cm.charCoords({
                    line,
                    ch: 0
                });
            }

            return {
                line,
                distance: position.top
            };

        }

        function getStopLintInfo({clientHeight}) {

            let line = cm.lineAtHeight(clientHeight);
            let position = cm.charCoords({line, ch: cm.getDoc().getLine(line).length - 1});

            while (position.bottom > clientHeight + 16) {
                line--;
                position = cm.charCoords({line, ch: cm.getDoc().getLine(line).length - 1});
            }

            return {
                line,
                distance: clientHeight - position.bottom + 16
            };

        }

        function getScrollData() {

            let scrollInfo = cm.getScrollInfo();

            let start = getStartLineInfo(scrollInfo);
            let stop = getStopLintInfo(scrollInfo);

            onScroll({
                start: start.line,
                stop: stop.line,
                top: start.distance,
                bottom: stop.distance,
                lineCount: cm.getDoc().lineCount()
            });

        }


        cm.on('scroll', throttle(getScrollData, 500, {leading: false, tailing: true}));

        getScrollData();

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

        cm.on('paste', (cm, e) => {
            let formats = clipboard.availableFormats();
            for (let i = 0, len = formats.length; i < len; i++) {
                if (/^image/.test(formats[i])) {
                    e.preventDefault();
                    let imagePath = remote.require('./actions').clipboard.saveImage();
                    if (imagePath) {
                        cm.getDoc().replaceSelection(`\n![](${imagePath})\n`);
                    }
                }
            }
        });

        cm.focus();

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
                className="editor" />
        );
    }

}

Editor.propTypes = {
    value: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};
