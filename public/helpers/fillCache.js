var async = require('async');
var getImage = require('./getImage.js');

var fillCache = new Promise(function (resolve, reject) {

});

var fillCache = function () {
  async.series([
    function (callback) {
      getImage('1');
    },
    function (callback) {
      getImage('2', function (err, results) {
        if (err !== null) {
          callback(err);
        } else {
          callback(results);
        }
      });
    }
  ],
  function (err, results) {
    debugger;
    if (err !== null) {
      console.log(err);
      throw err;
    }
    console.log(results);
  });
};

module.exports = fillCache;
