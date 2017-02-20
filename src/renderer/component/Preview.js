/**
 * @file Preview
 * @author leon <ludafa@outlook.com>
 */


import React, {Component, PropTypes} from 'react';
import styles from './Preview.css';
import MarkdownIt from 'markdown-it';

import markdownItDeflist from 'markdown-it-deflist';
import markdownItEmoji from 'markdown-it-emoji';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItIns from 'markdown-it-ins';
import markdownItMark from 'markdown-it-mark';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItContainer from 'markdown-it-container';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import markdownItAnchor from 'markdown-it-anchor';

// import {
//     onEditorScroll,
//     scrollEditor
// } from './ScrollSync';

const markdown = new MarkdownIt({
    highlight(str, lang) {

        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            }
            catch (__) {}
        }

        return ''; // use external default escaping
    }
});

markdown
    .use(markdownItDeflist)
    .use(markdownItEmoji)
    .use(markdownItFootnote)
    .use(markdownItIns)
    .use(markdownItMark)
    .use(markdownItAbbr)
    .use(markdownItContainer, 'warning')
    .use(markdownItSub)
    .use(markdownItSup)
    .use(markdownItAnchor, {
        level: 1,
        permalinkSymbol: '¶',
        permalink: true,
        permalinkClass: 'header-anchor'
    });

/* eslint-disable fecs-camelcase */
markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below

    if (!/^#/.test(tokens[idx].attrGet('href'))) {

        const aIndex = tokens[idx].attrIndex('target');

        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']); // add new attribute
        }
        else {
            tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
        }

    }

    // pass token to default renderer.
    return self.renderToken(tokens, idx, options, env, self);
};
/* eslint-enable fecs-camelcase */


function injectLineNumbers(tokens, idx, options, env, slf) {
    if (tokens[idx].map && tokens[idx].level === 0) {
        tokens[idx].attrSet('data-line', tokens[idx].map[0] + '');
    }
    return slf.renderToken(tokens, idx, options, env, slf);
}

[
    'table_open',
    'blockquote_open',
    'hr',
    'heading_open',
    'paragraph_open'
].forEach(name => {
    markdown.renderer.rules[name] = injectLineNumbers;
});


export default class Preview extends Component {

    componentDidMount() {
        this.buildId = 0;
        this.updateScrollMap();

        // onEditorScroll(e => {
        //
        //     if (!this.isScrollMapReady()) {
        //         this.updateScrollMap();
        //     }
        //
        //     this.syncScroll(e.begin);
        //
        // });

    }

    updateScrollMap() {
        this.scrollMap = this.buildScrollMap();
    }

    componentDidUpdate() {
        this.updateScrollMap();
    }

    componentWillUnmount() {
        this.scrollMap = null;
    }

    syncScroll(line) {
        const main = this.refs.main;
        this.syncScrolling = true;
        main.scrollTop = this.scrollMap[line];
    }

    isScrollMapReady() {
        return this.scrollMap.every(
            (item, i, arr) => (i === 0 || arr[i] > arr[i - 1])
        );
    }

    buildScrollMap() {

        let index = this.props.value.split('\n').map(_ => -1);

        let lights = Array
            .from(this.refs.main.querySelectorAll('[data-line]'))
            .map(element => {
                return {
                    line: +element.getAttribute('data-line'),
                    top: element.offsetTop
                };
            });

        lights.forEach(({line, top}) => {
            index[line] = top;
        });

        index[0] = 0;
        index.push(this.refs.main.scrollHeight);

        lights = lights.map(light => light.line);
        lights.push(index.length - 1);

        // 找不行行标的推测位置
        for (let i = 0, len = index.length, p = 0; i < len; i++) {

            if (index[i] !== -1) {
                p++;
                continue;
            }

            const a = lights[p - 1];
            const b = lights[p];

            index[i] = Math.round(
                (index[b] * (i - a) + index[a] * (b - i)) / (b - a)
            );

        }

        return index;

    }

    render() {

        return (
            <div
                ref="main"
                onScroll={e => {

                    if (this.syncScrolling) {
                        this.syncScrolling = false;
                        return;
                    }

                    if (!this.isScrollMapReady()) {
                        this.updateScrollMap();
                    }

                    // const line = this.scrollMap
                    //     .findIndex(top => top >= e.target.scrollTop);

                    // scrollEditor(line);

                }}
                className={styles.preview}
                style={{fontSize: this.props.fontSize}}
                dangerouslySetInnerHTML={{
                    __html: markdown.render(this.props.value)
                }}>
            </div>
        );
    }

}

Preview.propTypes = {
    fontSize: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};
