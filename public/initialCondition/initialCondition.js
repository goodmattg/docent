var fillCache = require('../helpers/fillCache.js');

var initialCondition = function () {

  return new Promise (function (resolve, reject) {

    var cache = fillCache(6); // Preset cache

    cache.then(function (result) {
      var cur = result.pop();
      var condition = Object.assign({}, { current_image: cur, images: result, mode: 'answer' });
      resolve(condition);
    });
  });
};

module.exports = initialCondition;
