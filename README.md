# RandomMap

<p align="center">
 <a href = "https://twitter.com/random_map">
  <img src = "./screenshot.jpg" alt = "Twitter Screenshot" />
 </a>
</p>

[@random_map](https://twitter.com/random_map) is a Twitter Bot that runs every several hours on a Raspberry Pi and tweets random aerial images of the Earth. Inspired by the [Earth View extension for Google Chrome](https://chrome.google.com/webstore/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh?hl=en). I had a five hour layover and decided to be productive.

# Code
RandomMap picks a random continent (except Antarctica) and generates a random coordinates inside the chosen continent. It then uses the Google Maps API to download satellite and terrain images of the generated coordinates, and tweets the pictures!

# Run
Run `npm ci` to download project dependencies

Create a `keys.js` file and create objects to hold your Twitter and Google Developer API keys. Make sure to export them, too:

```js
const google = {
    key: '...',
};
const twitter = {
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...'
};

module.exports = {
    google,
    twitter
};
```

Now you're all set. Simply do `npm run local`
