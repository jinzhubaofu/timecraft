/**
 * @file PreviewContainer
 * @author leon <ludafa@outlook.com>
 */

import {connect} from 'react-redux';
import {getPreviewState} from '../selector';
import Preview from '../component/Preview';

export default connect(
    getPreviewState
)(Preview);
