const defaultState = {
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
  croppedImage: null,
  selectedPalette: "",
  pixelArray: {},
  imageArray: {},
  originalImage: null,
  cropInfo: null,
  algorithm: "2000",
  extraPieces: {},
};

const Reducers = (state = defaultState, action = {}) => {
  switch (action.type) {
    case "SET_WINDOW_HEIGHT":
      return setWindowHeight(state, action);
    case "SET_WINDOW_WIDTH":
      return setWindowWidth(state, action);
    case "SET_CROPPED_IMAGE":
      return setCroppedImage(state, action);
    case "SET_SELECTED_PALETTE":
      return setSelectedPalette(state, action);
    case "SET_PIXEL_ARRAY":
      return setPixelArray(state, action);
    case "SET_IMAGE_ARRAY":
      return setImageArray(state, action);
    case "SET_ORIGINAL_IMAGE":
      return setOriginalImage(state, action);
    case "SET_CROP_INFO":
      return setBackupCropInfo(state, action);
    case "SET_ALGORITHM":
      return setAlgorithm(state, action);
    case "SET_EXTRA_PIECES":
      return setExtraPieces(state, action);
    default:
      return { ...state };
  }
};

const setWindowHeight = (state, action) => {
  return {
    ...state,
    windowHeight: action.payload,
  };
};

const setWindowWidth = (state, action) => {
  return {
    ...state,
    windowWidth: action.payload,
  };
};

const setCroppedImage = (state, action) => {
  return {
    ...state,
    croppedImage: action.payload,
  };
};

const setSelectedPalette = (state, action) => {
  return {
    ...state,
    selectedPalette: action.payload,
  };
};

const setPixelArray = (state, action) => {
  return {
    ...state,
    pixelArray: action.payload,
  };
};

const setImageArray = (state, action) => {
  return {
    ...state,
    imageArray: action.payload,
  };
};

const setOriginalImage = (state, action) => {
  return {
    ...state,
    originalImage: action.payload,
  };
};

const setBackupCropInfo = (state, action) => {
  return {
    ...state,
    cropInfo: action.payload,
  };
};

const setAlgorithm = (state, action) => {
  return {
    ...state,
    algorithm: action.payload,
  };
};

const setExtraPieces = (state, action) => {
  return {
    ...state,
    extraPieces: action.payload,
  };
};

export default Reducers;
