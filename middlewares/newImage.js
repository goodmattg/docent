var express = require('express');
var router = new express.Router();
var db = require('../db/mongo.js');

function getRandomIntInclusive (min, max, seen) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns index of an unseen image
var getUnseen = function (seen) {
  if (seen.length === 1824) { return -1; } // all images seen
  var im = getRandomIntInclusive(1, 1824);
  if (seen.length === 0) { return im; } // return
  while (seen.includes(im)) {
    im = getRandomIntInclusive(1, 1824);
  }
  console.log('New image is ' + im);
  return im;
};

router.use('/', function (req, res, next) {
  console.log('Got request for new image');
  // HACK to fix the fact that the bodyParser won't kick in
  var parsedQuery = JSON.parse(req._parsedOriginalUrl.query.replace(/\%22/g, '"'));
  var newImageId = getUnseen(parsedQuery.seen); // Id of the new image
  if (newImageId === -1) { next(new Error('ALL IMAGES SEEN')); }

  console.log('New Image is ' + newImageId);

 // Get an image not seen in the set
    db.Piece.findOne({id: newImageId}, (err, piece) => {
      if (err) {
        console.log('Error getting image');
        next(err);
      } else {
        console.log('Found image in database');
        debugger;
        res.send(JSON.stringify({newImage: piece._doc.image,
          caption: piece._doc.caption,
          seen: parsedQuery.seen.push(newImageId)}));
      }
    });
});

module.exports = router;
