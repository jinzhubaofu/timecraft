/**
 * @file markdown
 * @author leon <ludafa@outlook.com>
 */

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

export default markdown;
