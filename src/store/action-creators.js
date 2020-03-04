import * as actionTypes from './action-types';
import loadImage from '../utils/image';
import render from '../utils/canvas';

export const changeMode = currentMode => {
  return {
    type: actionTypes.MODE_CHANGED,
    currentMode,
  };
};

export const loadedImage = (canvas, ctx) => {
  return (dispatch, getState) => {
    const state = getState();
    const imageUrl = state.get('imageUrl');
    if (!imageUrl) {
      dispatch({
        type: actionTypes.IMAGE_LOADED,
        canvas: null,
        ctx: null,
        image: null,
      });
      return;
    }
    loadImage(canvas, imageUrl)
      .then(async image => {
        dispatch({
          type: actionTypes.IMAGE_LOADED,
          canvas,
          ctx,
          image,
        });
        await render(state);
      })
      .catch(err => console.error('err', err));
  };
};

export const changeImage = (imageUrl, fileType) => {
  if (!imageUrl) {
    return {
      type: actionTypes.IMAGE_CHANGED,
      imageUrl: '',
      filename: '',
      fileType: '',
      fileExt: '',
    };
  }
  const file = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
  const filename = file.substring(0, file.lastIndexOf('.'));
  const fileExt = file.substring(file.lastIndexOf('.') + 1);
  return {
    type: actionTypes.IMAGE_CHANGED,
    imageUrl,
    filename,
    fileType,
    fileExt,
  };
};

export const changeTextarea = text => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.TEXTAREA_CHANGED,
      text,
    });
    await render(state);
  };
};

export const changeColor = colorIndex => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.COLOR_CHANGED,
      colorIndex,
    });
    await render(state);
  };
};

export const changeOpacity = opacity => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.OPACITY_CHANGED,
      opacity,
    });
    await render(state);
  };
};

export const showAppName = showName => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: actionTypes.SHOW_APP_NAME_CHANGED,
      showName,
    });
    await render(state);
  };
};
