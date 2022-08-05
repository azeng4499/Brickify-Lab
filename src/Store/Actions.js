export const setWindowHeight = (height) => {
  return {
    type: "SET_WINDOW_HEIGHT",
    payload: height,
  };
};

export const setWindowWidth = (width) => {
  return {
    type: "SET_WINDOW_WIDTH",
    payload: width,
  };
};

export const uploadCroppedImage = (image) => {
  return {
    type: "SET_CROPPED_IMAGE",
    payload: image,
  };
};

export const setSelectedPalette = (palette) => {
  return {
    type: "SET_SELECTED_PALETTE",
    payload: palette,
  };
};

export const setPixelArray = (array) => {
  return {
    type: "SET_PIXEL_ARRAY",
    payload: array,
  };
};

export const setImageArray = (array) => {
  return {
    type: "SET_IMAGE_ARRAY",
    payload: array,
  };
};

export const setOriginalImage = (array) => {
  return {
    type: "SET_ORIGINAL_IMAGE",
    payload: array,
  };
};

export const setBackupCropInfo = (array) => {
  return {
    type: "SET_CROP_INFO",
    payload: array,
  };
};

export const setAlgorithm = (algorithm) => {
  return {
    type: "SET_ALGORITHM",
    payload: algorithm,
  };
};

export const setExtraPieces = (extraPieces) => {
  return {
    type: "SET_EXTRA_PIECES",
    payload: extraPieces,
  };
};
