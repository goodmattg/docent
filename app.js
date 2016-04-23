var getImage = require('./public/helpers/getImage.js');
var fillCache = require('./public/helpers/fillCache.js');
var initialCondition = require('./public/initialCondition/initialCondition.js');

var init = initialCondition();

init.then(function (result) {
  console.log(JSON.stringify(result));
});
