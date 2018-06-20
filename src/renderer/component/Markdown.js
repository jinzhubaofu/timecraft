/**
* @Author: leon
* @Date:   2017-02-28T16:49:09+08:00
* @Last modified by:   leon
* @Last modified time: 2017-03-01T10:22:36+08:00
*/



/**
 * @file React Markdown Component
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import autobind from 'autobind-decorator';
import {APP_NAME} from '../../common/constants';

class CodeBlock extends Component {

    componentDidMount() {
        this.highlight();
    }

    componentDidUpdate() {
        this.highlight();
    }

    highlight() {
        if (this.code) {
            hljs.highlightBlock(this.code);
        }
    }

    render() {
        return (
            <pre>
                <code ref={code => (this.code = code)}>
                    {this.props.literal}
                </code>
            </pre>
        );
    }

}

export default class MyMarkdown extends Component {

    @autobind
    transformImageURI(url) {
        return /^https?/.test(url) ? url : `${APP_NAME}://${url}`;
    }

    render() {
        return (
            <ReactMarkdown
                sourcePos={true}
                transformImageUri={this.transformImageURI}
                source={this.props.source}
                className="markdown-body"
                renderers={{
                    ...ReactMarkdown.renderers,
                    CodeBlock
                }}/>
        );
    }

}
