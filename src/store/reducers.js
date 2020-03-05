import {fromJS} from 'immutable';
import render from '../utils/canvas';
import {
  MODE_CHANGED,
  IMAGE_CHANGED,
  IMAGE_LOADED,
  TEXTAREA_CHANGED,
  COLOR_CHANGED,
  OPACITY_CHANGED,
  SHOW_APP_NAME_CHANGED,
  FORCE_RENDER,
} from './action-types';

const defaultState = fromJS({
  currentMode: '',
  canvas: null,
  context: null,
  image: null,
  imageUrl: '',
  filename: '',
  fileType: '',
  fileExt: '',
  fillText: '',
  colors: [
    {label: '白色', value: '255, 255, 255', color: 'gray'},
    {label: '灰色', value: '128, 128, 128', color: 'gray'},
    {label: '黑色', value: '0, 0, 0', color: 'gray'},
    {label: '红色', value: '255, 0, 0', color: 'gray'},
    {label: '橙色', value: '255, 165, 0', color: 'gray'},
    {label: '蓝色', value: '0, 0, 255', color: 'gray'},
  ],
  colorIndex: 1,
  opacity: 1,
  showName: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case MODE_CHANGED:
      return state.set('currentMode', action.currentMode);
    case IMAGE_CHANGED:
      return state
        .set('imageUrl', action.imageUrl)
        .set('filename', action.filename)
        .set('fileType', action.fileType)
        .set('fileExt', action.fileExt);
    case IMAGE_LOADED:
      return state
        .set('canvas', action.canvas)
        .set('context', action.context)
        .set('image', action.image);
    case TEXTAREA_CHANGED:
      return state.set('fillText', action.text);
    case COLOR_CHANGED:
      return state.set('colorIndex', action.colorIndex);
    case OPACITY_CHANGED:
      return state.set('opacity', action.opacity);
    case SHOW_APP_NAME_CHANGED:
      return state.set('showName', action.showName);
    case FORCE_RENDER:
      setTimeout(async () => {
        await render(state);
      }, 300);
      return state;
    default:
      return state;
  }
};
