var async = require('async');
var request = require('request');
var htmlToJson = require("html-to-json");
var fs = require('fs');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var page = getRandomInt(1, 1154); // RANDOM MOMA PAGE

var getImage = function (filename, outerCb) {
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
                return $doc.find('h2 a').text();
              },
              'title': function ($doc) {
                return $doc.find('h1').text();
              },
              'year': function ($doc) {
                return $doc.find('h3').text();
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
      console.log(pageObject);
      var url = 'http://moma.org' + pageObject['image-container'].image;

      request(url, {encoding: 'binary'}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          fs.writeFile(filename + '.jpg', body, 'binary', function (err) {});
          callback(null, body);
        } else {
          callback(error);
        }
      });
    }
  ]
  ,
   function (err, results) {
     if (err !== null) {
       console.log('Error: ');
       outerCb(err);
     } else {
       outerCb(null);
     }
   });
}

module.exports = getImage;


// var http = require('http')
//   , fs = require('fs');

// fs.readFile('image.jpg', function(err, data) {
//   if (err) throw err; // Fail if the file can't be read.
//   http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'image/jpeg'});
//     res.end(data); // Send the file data to the browser.
//   }).listen(8124);
//   console.log('Server running at http://localhost:8124/');
// });

// fs = require('fs');
// http = require('http');
// url = require('url');


// http.createServer(function(req, res){
//   var request = url.parse(req.url, true);
//   var action = request.pathname;

//   if (action == '/logo.gif') {
//      var img = fs.readFileSync('./logo.gif');
//      res.writeHead(200, {'Content-Type': 'image/gif' });
//      res.end(img, 'binary');
//   } else {
//      res.writeHead(200, {'Content-Type': 'text/plain' });
//      res.end('Hello World \n');
//   }
// }).listen(8080, '127.0.0.1');

