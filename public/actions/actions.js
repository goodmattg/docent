var refillCache = function () {
  return {
    type: 'REFILLCACHE'
  };
};

var nextImage = function () {
  return {
    type: 'NEXTIMAGE'
  }
}
var changeMode = function (newMode) {
  return {
    type: 'CHANGEMODE',
    mode: newMode
  };
};

module.exports {
  'refillCache': refillCache,
  'nextImage': nextImage,
  'changeMode': changeMode
};
