/**
 * @file EditorContainer
 * @author leon <ludafa@outlook.com>
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getEditorState} from '../selector';
import Editor from '../component/Editor';
import {
    updateEditorValue
} from '../actions';

class EditorContainer extends Component {

    render() {

        const {
            fontSize,
            value,
            onChange
        } = this.props;

        return (
            <Editor
                value={value}
                fontSize={fontSize}
                onChange={onChange} />
        );
    }

}

EditorContainer.propTypes = {
    fontSize: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default connect(
    getEditorState,
    {
        onChange: updateEditorValue
    }
)(EditorContainer);
