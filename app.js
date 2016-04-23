var getImage = require('./public/helpers/getImage.js');
var fillCache = require('./public/helpers/fillCache.js');


(function () {
  var cache = fillCache(10);

  cache.then(function (result) {
    console.log(result);
  });

})();
