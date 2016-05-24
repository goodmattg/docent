var nextImage = function (piece) {
  return {
    type: 'NEXTIMAGE',
    newPiece: piece
  };
};

var changeMode = function (mode) {
  return {
    type: 'CHANGEMODE',
    newMode: mode
  };
};

var setInitialAsync = function (state) {
  return {
    type: 'SETINITIAL_ASYNC',
    initialState: state
  };
};

var addStill = function (currentPiece) {
  return {
    type: 'ADDSTILL',
  };
};

module.exports = {
  nextImage: nextImage,
  changeMode: changeMode,
  setInitialAsync: setInitialAsync,
  addStill: addStill
};
