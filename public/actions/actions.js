var nextImage = function () {
  return {
    type: 'NEXTIMAGE'
  };
};

var changeMode = function (newMode) {
  return {
    type: 'CHANGEMODE',
    mode: newMode
  };
};

module.exports = {
  nextImage: nextImage,
  changeMode: changeMode
};
