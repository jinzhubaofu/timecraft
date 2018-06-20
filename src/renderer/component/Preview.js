/**
 * @file Preview
 * @author leon <ludafa@outlook.com>
 */


import React, {Component, PropTypes} from 'react';
import Markdown from './Markdown';
import smoothScroll from '../common/util/smoothScroll';

export default class Preview extends Component {

    componentDidMount() {

        if (this.props.scroll) {
            this.buildScrollMap();
            return;
        }

    }

    componentWillReceiveProps(nextProps) {

        let {value, scroll} = nextProps;

        if (this.props.value !== value || !this.scrollMap) {
            this.needToRebuildPosition = true;
        }

        if (this.props.scroll !== scroll) {
            this.needToScroll = true;
        }

    }

    componentDidUpdate() {

        if (this.needToRebuildPosition) {
            this.buildScrollMap();
            this.needToRebuildPosition = false;
        }

        if (this.needToScroll) {
            this.scroll(this.props.scroll);
            this.needToScroll = false;
        }

    }

    buildScrollMap() {

        let {value, scroll} = this.props;

        if (!value) {
            return;
        }

        let lineCount = scroll.lineCount;
        let main = this.refs.main;
        let baseOffsetTop = main.firstChild.firstChild.offsetTop;

        let scrollMap = []
            .slice
            .call(main.querySelectorAll('[data-sourcepos]'))
            .reduce((map, dom) => {

                let match = /^(\d+):\d+-(\d+):\d+$/
                    .exec(dom.getAttribute('data-sourcepos'));

                let startLine = +match[1] - 1;
                let stopLine = +match[2];

                let {offsetHeight, offsetTop} = dom;

                for (let i = 0, len = stopLine - startLine; i < len; i++) {
                    let index = startLine + i;
                    map[index] = Math.round(offsetTop + i * offsetHeight / len) - baseOffsetTop;
                    if (map.max < index) {
                        map.max = index;
                    }
                    if (map.min > index) {
                        map.min = index;
                    }
                }

                return map;

            }, {min: Number.MAX_SAFE_INTEGER, max: -1});

        let index = -1;

        for (let i = 0; i < lineCount; i++) {

            if (
                // 没找到空槽段起始点
                index === -1 && scrollMap[i] != null
                // 在空槽段，没到结束点
                || index !== -1 && scrollMap[i] == null
            ) {
                continue;
            }

            // 找到空槽段起点
            if (index === -1 && scrollMap[i] == null) {
                index = i - 1;
                continue;
            }

            let step = (scrollMap[i] - scrollMap[index]) / (i - index);

            // 找到空槽段结束点
            for (let j = 1; j < i - index; j++) {
                scrollMap[index + j] = scrollMap[index] + j * step;
            }

            index = -1;

        }

        this.scrollMap = scrollMap;

    }

    scroll(scrollState) {

        let {start, stop, direction, top, bottom} = scrollState;
        let main = this.refs.main;
        let currentScrollTop = main.scrollTop;
        let line = direction === 'up' ? start : stop;
        let map = this.scrollMap[line];

        if (
            direction === 'down' && map < currentScrollTop
            || direction === 'up' && map > currentScrollTop
        ) {
            return;
        }

        let distance = direction === 'up' ? top : bottom;

        let target;

        if (line >= this.scrollMap.max) {
            target = main.scrollHeight;
        }
        else if (line <= this.scrollMap.min) {
            target = 0;
        }
        else {

            target = direction === 'down'
                ? map - main.offsetHeight + distance
                : map + distance;

        }

        smoothScroll(main, currentScrollTop, target);

    }

    render() {

        let {fontSize, value} = this.props;

        return (
            <div
                ref="main"
                className="preview"
                style={{fontSize}}>
                <Markdown source={value} />
            </div>
        );
    }

}

Preview.propTypes = {
    fontSize: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};
