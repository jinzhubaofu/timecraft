/**
 * @file PreviewContainer
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getPreviewState} from '../selector';
import Preview from '../component/Preview';

// import {
//     updatePreviewValue
// } from '../actions';

class PreviewContainer extends Component {

    render() {

        const {
            fontSize,
            value
        } = this.props;

        return (
            <Preview value={value} fontSize={fontSize} />
        );
    }

}

PreviewContainer.propTypes = {
    fontSize: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
};

export default connect(
    getPreviewState,
    {}
)(PreviewContainer);
