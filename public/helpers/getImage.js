var async = require('async');
var request = require('request');
var htmlToJson = require("html-to-json");
var fs = require('fs');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var page = getRandomInt(1, 1154); // RANDOM MOMA PAGE

var getImage = function(filename) {
  return new Promise(function (resolve, reject) {
    async.waterfall([
      function (callback) {
        request('http://www.moma.org/collection/?locale=en&page=' + page + '&with_images=true', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            callback(null, body);
          } else {
            callback(error);
          }
        });
      }
      ,
      function (rawHtml, callback) {
        htmlToJson.parse(rawHtml, {
          'outer': {
            $container: '.tile-container', 'image': function ($doc) {
              var tileSet = $doc.find('.tile a');
              var tileNum = getRandomInt(0, tileSet.length-1);
              var tile = tileSet[tileNum];
              return tile.attribs.href;
            }
          }

        }, function (err, result) {
          if (err) {
            callback(err);
          } else {
            callback(null, result);
          }
        });
      }
      ,
      function (linkToImage, callback) {
        request('http://www.moma.org' + linkToImage.outer.image, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            callback(null, body);
          } else {
            callback(error);
          }
        });
      }
      ,
      function (rawHtml, callback) {
        htmlToJson.parse(rawHtml, {
            'image-container': {
              $container: '.page-content', 'image': function ($doc) {
                return $doc.find('.sov-hero img').attr('srcset').split(',')[2].trim().split(' ')[0];
              }
            },
            'caption': {
              $container: '.layout-wrapper .short-caption',
                'artist': function ($doc) {
                  // Trim newline characters from caption fields
                  return $doc.find('h2 a').text().replace(/\r?\n|\r/g, '');
                },
                'title': function ($doc) {
                  return $doc.find('h1').text().replace(/\r?\n|\r/g, '');;
                },
                'year': function ($doc) {
                  return $doc.find('h3').text().replace(/\r?\n|\r/g, '');;
                }
            }
          }
          ,
          function (err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
        });
      }
      ,
      function (pageObject, callback) {

        Object.assign(pageObject, {file: filename + '.jpg'});
        var url = 'http://moma.org' + pageObject['image-container'].image;
        request(url, {encoding: 'binary'}, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            // Store the image in cache folder
            fs.writeFile('public/imageCache/' + pageObject.file, body, 'binary', function (err) {});
            var doneImage = Object.assign({}, {caption: pageObject.caption, filename: pageObject.file});
            // return the caption/file object
            callback(null, doneImage);
          } else {
            console.log('Error pulling MOMA image resource');
            callback(error);
          }
        });
      }
    ]
    ,
     function (err, results) {
       if (err !== null) {
         console.log('Error: ');
         reject(err);
       } else {
         resolve(results);
       }
     });
  });
}

module.exports = getImage;

