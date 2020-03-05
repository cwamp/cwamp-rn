import * as actionTypes from './action-types';
import loadImage from '../utils/image';

export const changeMode = currentMode => {
  return {
    type: actionTypes.MODE_CHANGED,
    currentMode,
  };
};

export const loadedImage = (canvas, context) => {
  return (dispatch, getState) => {
    const state = getState();
    const imageUrl = state.get('imageUrl');
    if (!imageUrl) {
      dispatch({
        type: actionTypes.IMAGE_LOADED,
        canvas: null,
        context: null,
        image: null,
      });
      return;
    }
    loadImage(canvas, imageUrl)
      .then(image => {
        dispatch({
          type: actionTypes.IMAGE_LOADED,
          canvas,
          context,
          image,
        });
        dispatch({
          type: actionTypes.FORCE_RENDER,
        });
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
  return dispatch => {
    dispatch({
      type: actionTypes.TEXTAREA_CHANGED,
      text,
    });
    dispatch({
      type: actionTypes.FORCE_RENDER,
    });
  };
};

export const changeColor = colorIndex => {
  return dispatch => {
    dispatch({
      type: actionTypes.COLOR_CHANGED,
      colorIndex,
    });
    dispatch({
      type: actionTypes.FORCE_RENDER,
    });
  };
};

export const changeOpacity = opacity => {
  return dispatch => {
    dispatch({
      type: actionTypes.OPACITY_CHANGED,
      opacity,
    });
    dispatch({
      type: actionTypes.FORCE_RENDER,
    });
  };
};

export const showAppName = showName => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SHOW_APP_NAME_CHANGED,
      showName,
    });
    dispatch({
      type: actionTypes.FORCE_RENDER,
    });
  };
};
