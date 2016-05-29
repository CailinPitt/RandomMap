# RandomMap
[@random_map](https://twitter.com/random_map) is a Twitter Bot that runs every several hours on a Raspberry Pi and tweets random aerial images of the Earth. Inspired by the [Earth View extension for Google Chrome](https://chrome.google.com/webstore/detail/earth-view-from-google-ea/bhloflhklmhfpedakmangadcdofhnnoh?hl=en). I had a five hour layover and decided to be productive.

# Code
Uses two gems:
* Chatterbot - A really cool Ruby based Twitter Bot framework, used to tweet images
* static_map - An equally as cool gem that uses Google's Static Map API to generate static aerial images

# Future Work
* ~~Oceans cover 71% of the Earth's surface. Unfortunately, pictures of water don't look cool. I need to restrict @random_map from calculating latitude & longitude of oceans.~~ Latitude & longitude is now restricted to land
* In order to trigger the event to send a tweet, Chatterbot searches latest tweets on Twitter for the 'a' character. If it finds a tweet containing the letter 'a' (why wouldn't it?), it tweets a new aerial picture. Pretty dumb, right? Must change this.
* ~~Emojis are cool~~ Tweets now come with emojis :bowtie: :neckbeard: :sparkles:
