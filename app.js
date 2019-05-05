const GoogleMapsAPI = require('googlemaps')
const fs = require('fs')
const request = require('request')
const randomFloat = require('random-float')
var Twit = require('twit')
var emoji = require('node-emoji')

var T = new Twit({
  consumer_key: 'yFlaPrgrNmnu0xGOBUho2fGbR',
  consumer_secret: 'LcRKpbneTGS6CZbQcAvdGqeXTETNskm0HBCMrN4C6GH7vnIc3y',
  access_token: '710948858423959552-P6tUyCxoLXGix4YN1tjL4jsWEZ20rqB',
  access_token_secret: 'G6fcN8lR7KmlEKrrJvpKPFC8ExBHccNEJzPtbC8oiWSLp'
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var publicConfig = {
    key: 'AIzaSyAKfombgAtABCymfaO8G_ESr8OD4Txp1f4'
};

var continent = getRandomInt(5);
var zoom = getRandomIntInRange(11, 15);

var message = "Somewhere in"
var center;

switch(continent) {
    case 0:
      center = "" + randomFloat(30.208889, 50.0) + ", " + randomFloat(-118.733056, -76.620833)
      message = message + " North America"
      break;
    case 1:
      center = "" + randomFloat(-13.896389, 1.458611) + ", " + randomFloat(-75.328611, -39.793056)
      message = message + " South America"
      break;
    case 2:
      center = "" + randomFloat(-19.981944, 21.346983) + ", " + randomFloat(14.4467, 34.25)
      message = message + " Africa"
      break;
    case 3:
      center = "" + randomFloat(43.0042, 48.0) + ", " + randomFloat(2.500556, 44.618056)
      message = message + " Europe"
      break;
    case 4:
      center = "" + randomFloat(21.2661, 49.7333) + ", " + randomFloat(70.0, 106.0)
      message = message + " Asia"
      break;
    default:
      center = "" + randomFloat(-31.643611, -20.6833) + ", " + randomFloat(116.155, 145.277736)
      message = message + " Australia"
}

message += '\n\n' + center + '\n\n' + emoji.random().emoji + ' ' + emoji.random().emoji + ' ' + emoji.random().emoji + ' ' + emoji.random().emoji + ' ' + emoji.random().emoji;

var gmAPI = new GoogleMapsAPI(publicConfig);
var paramsSatellite = {
    center: center,
    zoom: zoom,
    size: '2000x2000',
    maptype: 'satellite',
    scale: 2
};

var paramsRoad = {
    center: center,
    zoom: zoom,
    size: '2000x2000',
    maptype: 'roadmap',
    scale: 2
};

var paramsTerrain = {
  center: center,
  zoom: zoom,
  size: '2000x2000',
  maptype: 'terrain',
  scale: 2
};

var imageSatellite = gmAPI.staticMap(paramsSatellite);

var streamSatellite = request(imageSatellite).pipe(fs.createWriteStream('satellite.png'));

streamSatellite.on('finish', function() {
  var imageRoad = gmAPI.staticMap(paramsRoad);

  var streamRoad = request(imageRoad).pipe(fs.createWriteStream('road.png'));
  
  streamRoad.on('finish', function() {

    var imageTerrain = gmAPI.staticMap(paramsTerrain);

    var streamTerrain = request(imageTerrain).pipe(fs.createWriteStream('terrain.png'));
    
    streamTerrain.on('finish', function() {
      var satellite = fs.readFileSync('satellite.png', { encoding: 'base64' });
      var road = fs.readFileSync('road.png', { encoding: 'base64' });
      var terrain = fs.readFileSync('terrain.png', { encoding: 'base64' });
    
      T.post('media/upload', { media_data: satellite }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdSatellite = data.media_id_string
        var satelliteAltText = "Satellite"
        var meta_params = { media_id: mediaIdSatellite, alt_text: { text: satelliteAltText } }
      
        T.post('media/metadata/create', meta_params, function (err, data, response) {
          if (!err) {
            T.post('media/upload', { media_data: road }, function (err, data, response) {
              // now we can assign alt text to the media, for use by screen readers and
              // other text-based presentations and interpreters
              var mediaIdRoad = data.media_id_string
              var roadAltText = "Road"
              meta_params = { media_id: mediaIdRoad, alt_text: { text: roadAltText } }
            
              T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {

                  T.post('media/upload', { media_data: terrain }, function (err, data, response) {
                    // now we can assign alt text to the media, for use by screen readers and
                    // other text-based presentations and interpreters
                    var mediaIdTerrain = data.media_id_string
                    var terrainAltText = "Terrain"
                    meta_params = { media_id: mediaIdTerrain, alt_text: { text: terrainAltText } }
                  
                    T.post('media/metadata/create', meta_params, function (err, data, response) {
                      if (!err) {
                        // now we can reference the media and post a tweet (media will attach to the tweet)
                        var params = { status: message, media_ids: [mediaIdSatellite, mediaIdRoad, mediaIdTerrain] }
                  
                        T.post('statuses/update', params, function (err, data, response) {
                        })
                      }
                    })
                  })
                }
              })
            })
          }
        })
      })
    })
  });
});