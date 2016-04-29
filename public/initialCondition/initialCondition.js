// var mongo = require('../../db/mongo.js');
var $ = require('jquery');

var initialCondition = function () {

  return new Promise (function (resolve, reject) {

    var data = {seen: [0]};

    $.ajax({
    url: 'http://localhost:3000/newImage',
    type: "GET",
    data: JSON.stringify(data),
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (initialState) {
        // NEW IMAGE AND CAPTION RECEIVED and seen.
        // Save the image and return the state
        var response = JSON.parse(initialState);

        console.log('Server responded with initial state!');

        resolve(Object.assign({}, response, {mode: 'answer'}));
      },
      error: function (jqXHR, type) {
        reject(type);
      }
    });


  });
};

module.exports = initialCondition;
