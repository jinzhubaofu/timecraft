/**
 * @file EditorContainer
 * @author leon <ludafa@outlook.com>
 */

import {connect} from 'react-redux';
import {getEditorState} from '../selector';
import Editor from '../component/Editor';
import {
    updateEditorValue,
    updateEditorScrollData
} from '../actions';


export default connect(
    getEditorState,
    {
        onChange: updateEditorValue,
        onScroll: updateEditorScrollData
    }
)(Editor);
