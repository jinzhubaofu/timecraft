/**
 * @file Scroll Sync Module
 * @author leon <ludafa@outlook.com>
 */

import {EventEmitter} from 'events';

const emitter = new EventEmitter();

const EVENT_TYPE_EDITOR_SCROLL = 'editor-scroll';
const EVENT_TYPE_PREVIEW_SCROLL = 'preview-scroll';

export function onPreviewScroll(handler) {
    emitter.on(EVENT_TYPE_PREVIEW_SCROLL, handler);
}

export function onEditorScroll(handler) {
    emitter.on(EVENT_TYPE_EDITOR_SCROLL, handler);
}

export function scrollEditor(e) {
    emitter.emit(EVENT_TYPE_PREVIEW_SCROLL, e);
}

export function scrollPreview(e) {
    emitter.emit(EVENT_TYPE_EDITOR_SCROLL, e);
}
