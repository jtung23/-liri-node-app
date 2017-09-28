var twitter = require('twitter');
var spotify = require('node-spotify-api');
var twitterKeys = new twitter ({
  consumer_key: 'gjAZG493GMVv0NOtz5MvWyROf',
  consumer_secret: 'np16ejOQ1ZjPJxtLeM7Bo9rvOMd9vpGp0l5CNzNA2x3afS0DQo',
  access_token_key: '910233625022443520-tSEsshBVPGldEHivv4F5jWxo2Vku8zG',
  access_token_secret: 'GOz6BAolZgjRlEVtVWEbppx7kUj1Y5VOkxuqeILrB9ZdB',
});

var spotify = new spotify({
  id: '048813d7d0d6453da0af466dbb3cb960',
  secret: 'abfdbf9b0a114fe1846c4df5ebe530ae'
});

module.exports = {
	twitterKeys,
	spotify
};