const axios = require('axios');
const fs = require('fs-extra');
const GoogleMapsAPI = require('googlemaps');
const emoji = require('node-emoji');
const path = require('path');
const randomFloat = require('random-float');

const { google } = require('./keys.js');
const {
  cleanup,
  getRandomInt,
  getRandomIntInRange,
  makePost,
} = require('./util.js');

const gmAPI = new GoogleMapsAPI(google);

const assetDirectory = './assets/';

const chooseContinent = () => {
  let center;
  const continent = getRandomInt(5);
  let status = "Somewhere in";

  switch (continent) {
    case 0:
      center = "" + randomFloat(30.208889, 50.0) + ", " + randomFloat(-118.733056, -76.620833);
      status = status + " North America";
      break;
    case 1:
      center = "" + randomFloat(-13.896389, 1.458611) + ", " + randomFloat(-75.328611, -39.793056);
      status = status + " South America";
      break;
    case 2:
      center = "" + randomFloat(-19.981944, 21.346983) + ", " + randomFloat(14.4467, 34.25);
      status = status + " Africa";
      break;
    case 3:
      center = "" + randomFloat(43.0042, 48.0) + ", " + randomFloat(2.500556, 44.618056);
      status = status + " Europe";
      break;
    case 4:
      center = "" + randomFloat(21.2661, 49.7333) + ", " + randomFloat(70.0, 106.0);
      status = status + " Asia";
      break;
    default:
      center = "" + randomFloat(-31.643611, -20.6833) + ", " + randomFloat(116.155, 145.277736);
      status = status + " Australia";
  }

  status += '\n\n' + center + '\n\n' + 
    emoji.random().emoji + ' ' +
    emoji.random().emoji + ' ' +
    emoji.random().emoji + ' ' +
    emoji.random().emoji + ' ' +
    emoji.random().emoji;

    return {
      center,
      status
    };
}

const downloadMap = async (center, maptype, imagePath) => {
  const imageParams = {
    center,
    zoom: getRandomIntInRange(11, 15),
    maptype,
    size: '2000x2000',
    scale: 2,
  };

  const imageURL = gmAPI.staticMap(imageParams);

  const image = path.resolve(__dirname, imagePath);

  const writer = fs.createWriteStream(image);

  const response = await axios({
    url: imageURL,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise(resolve => response.data.pipe(writer).on('finish', resolve));
}

const upload = (media_data) => makePost('media/upload', {
  media_data
}).then(data => data.media_id_string);

const makeStatusUpdate = (media_ids, status) => makePost('statuses/update', {
  status,
  media_ids
});

const tweet = async (status) => {
  const media_ids = [];
  const satellite = fs.readFileSync(assetDirectory + 'satellite.png', { encoding: 'base64' });
  const terrain = fs.readFileSync(assetDirectory + 'terrain.png', { encoding: 'base64' });

  media_ids.push(await upload(satellite));
  media_ids.push(await upload(terrain));

  await makeStatusUpdate(media_ids.toString(), status);
}

const run = async () => {
  fs.ensureDirSync(assetDirectory);

  const imageInfo = chooseContinent();

  await downloadMap(imageInfo.center, 'satellite', assetDirectory + 'satellite.png');
  await downloadMap(imageInfo.center, 'terrain', assetDirectory + 'terrain.png');

  tweet(imageInfo.status);

  cleanup(assetDirectory);
}

run();
