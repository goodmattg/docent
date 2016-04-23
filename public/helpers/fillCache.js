var getImage = require('./getImage.js');

var fillCache = function () {
  return new Promise(function (resolve, reject) {

    // Establish promises for each individual image
    var im1 = getImage('1');
    var im2 = getImage('2');
    var im3 = getImage('3');
    var im4 = getImage('4');
    var im5 = getImage('5');
    var im5 = getImage('6');
    var im5 = getImage('7');
    var im5 = getImage('8');

    // Condition the fill cache promise on fulfill of individual images
    Promise.all([im1, im2, im3, im4, im5]).then(function (response) {
      resolve(results);
    }, function (error) {
      reject(error);
    });
  });
};

module.exports = fillCache;
