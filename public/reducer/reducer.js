var getImage = require('../helpers/getImage.js');
var initialCondition = require('../initialCondition/initialCondition.js');

var reducer = function (state, action) {

  switch (action.type) {

  case 'NEXTIMAGE':
    if (state.images.length === 0) {
      // Empty cache. Reset to initial condition.
      var initial = initialCondition();
      initial.then(function (init) {
        return Object.assign({}, state, {current_image: init.current_image,
          images: init.images, mode: init.mode
        });
      });

    } else {
      // Nonempt cache. Move image from cache to current.
      var oldFile = state['current_image'].filename;  // old filename
      var newImage = getImage(oldFile); // promise on new image

      newImage.then(function (caption) {
        // Asynchronously add image to cache
        state.images.push(caption);
      });
      return Object.assign({}, state, {current_image: state.images.slice(-1),
        images: state.images.slice(0, -1), mode: 'answer'});
    }
    break;

  case 'CHANGEMODE':
    return Object.assign({}, state, {mode: action.mode});
  }
};

module.exports = {
  reducer: reducer
};
