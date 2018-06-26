const GoogleMapsAPI = require('googlemaps')
const fs = require('fs')
const request = require('request')
const randomFloat = require('random-float')
var Twitter = require('twitter')

var publicConfig = {
    key: 'AIzaSyAKfombgAtABCymfaO8G_ESr8OD4Txp1f4'
};

randomFloat(10, 100);

var continent = getRandomInt(5);
var message = "Somewhere near"
var center;

switch(continent) {
    case 0:
      center = "" + randomFloat(30.208889, 50.0) + "," + randomFloat(-118.733056, -76.620833)
      message = message + " North America"
      break;
    case 1:
      center = "" + randomFloat(-13.896389, 1.458611) + "," + randomFloat(-75.328611, -39.793056)
      message = message + " South America"
      break;
    case 2:
      center = "" + randomFloat(-19.981944, 21.346983) + "," + randomFloat(14.4467, 34.25)
      message = message + " Africa"
      break;
    case 3:
      center = "" + randomFloat(43.0042, 48.0) + "," + randomFloat(2.500556, 44.618056)
      message = message + " Europe"
      break;
    case 4:
      center = "" + randomFloat(21.2661, 49.7333) + "," + randomFloat(70.0, 106.0)
      message = message + " Asia"
      break;
    default:
      center = "" + randomFloat(-31.643611, -20.6833) + "," + randomFloat(116.155, 145.277736)
      message = message + " Australia"
}

var gmAPI = new GoogleMapsAPI(publicConfig);
var paramsSatellite = {
    //center: '444 W Main St Lock Haven PA',
    center: center,
    zoom: 13,
    size: '2000x2000',
    maptype: 'satellite'
};

var paramsRoad = {
    //center: '444 W Main St Lock Haven PA',
    center: center,
    zoom: 13,
    size: '2000x2000',
    maptype: 'roadmap'
};
var imageSatellite = gmAPI.staticMap(paramsSatellite);

var streamSatellite = request(imageSatellite).pipe(fs.createWriteStream('satellite.png'));

streamSatellite.on('finish', function() {
    console.log("done downloading satellite")
});

var imageRoad = gmAPI.staticMap(paramsRoad);

var streamRoad = request(imageRoad).pipe(fs.createWriteStream('road.png'));

streamRoad.on('finish', function() {
    console.log("done downloading road")
});

var client = new Twitter({
    consumer_key: 'yFlaPrgrNmnu0xGOBUho2fGbR',
    consumer_secret: 'LcRKpbneTGS6CZbQcAvdGqeXTETNskm0HBCMrN4C6GH7vnIc3y',
    access_token_key: '710948858423959552-P6tUyCxoLXGix4YN1tjL4jsWEZ20rqB',
    access_token_secret: 'G6fcN8lR7KmlEKrrJvpKPFC8ExBHccNEJzPtbC8oiWSLp'
  });

  // Load your image
//var data1 = require('fs').readFileSync('satellite.png', { encoding: 'base64' });
//var data2 = require('fs').readFileSync('road.png');

//var images = data1 + ',' + data2;
// Make post request on media endpoint. Pass file data as media parameter
/*
client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
    }
  });

  */

/*
client.post('media/upload', {media: data1}, function(error, media, response) {

  if (!error) {

    // If successful, a media object will be returned.
    console.log(media);

    // Lets tweet it
    var status = {
      status: 'I am a tweet',
      media_ids: media.media_id_string // Pass the media id string
    }

    client.post('statuses/update', status, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }
    });

  }
});

*/
