var getImage = require('./public/helpers/getImage.js');
var fillCache = require('./public/helpers/fillCache.js');

(function () {
  var im1 = getImagePromise('1');
  var im2 = getImagePromise('2');
  var im3 = getImagePromise('3');
  var im4 = getImagePromise('4');
  var im5 = getImagePromise('5');
  Promise.all([im1, im2, im3, im4, im5]).then(function (response) {
    console.log(response);
  }, function (error) {
    console.log(error);
  });

  // if (ret instanceof Error) {
  //   console.log('Got an Error');
  // } else {
  //   console.log(ret);
  // }
})();


// fillCache();
