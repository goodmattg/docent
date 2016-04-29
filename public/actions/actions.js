var nextImage = function (piece) {
  return {
    type: 'NEXTIMAGE',
    data: piece
  };
};

var changeMode = function (newMode) {
  return {
    type: 'CHANGEMODE',
    mode: newMode
  };
};

var setInitialAsync = function (state) {
  return {
    type: 'SETINITIAL_ASYNC',
    data: state
  };
};

module.exports = {
  nextImage: nextImage,
  changeMode: changeMode,
  setInitialAsync: setInitialAsync
};
