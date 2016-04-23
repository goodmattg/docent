var async = require('async');
var getImage = require('./apiHitTest.js');

async.parallel([
  function (callback) {
    getImage('1', callback);
  },
    function (callback) {
    getImage('2', callback);
  },
    function (callback) {
    getImage('3', callback);
  },
    function (callback) {
    getImage('4', callback);
  },
    function (callback) {
    getImage('5', callback);
  }
],
function (err, results) {
  if (err !== null) {
    throw err;
  }
});

