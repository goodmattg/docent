var $ = require('jquery');

var getImage = function (seen) {
  return new Promise (function (resolve, reject) {
    $.ajax({
      url: 'http://localhost:3000/newImage',
      type: "GET",
      data: JSON.stringify({seen: seen}),
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (newState) {
          // New image and caption received
          var response = JSON.parse(newState);
          console.log('Server responded with new state!');
          resolve(newState);
        },
        error: function (jqXHR, type) {
          reject(type);
        }
    });
  });
};

module.exports = getImage;

