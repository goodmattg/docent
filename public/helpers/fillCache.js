var getImage = require('./getImage.js');

var fillCache = function (cacheSize) {
  return new Promise(function (resolve, reject) {

    var images = [];
    for (var i = 1; i <= cacheSize; i++) { images.push(String(i)); }
    // Establish promises for each individual image
    var imagePromises = images.map(getImage);

    // Condition the fill cache promise on fulfill of individual images
    Promise.all(imagePromises).then(function (results) {
      resolve(results);
    }, function (error) {
      reject(error);
    });
  });
};

module.exports = fillCache;
