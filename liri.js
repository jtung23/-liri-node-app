var request = require('request');
var keys = require('./keys.js');
var twitter = keys.twitterKeys;
var spotify = keys.spotify;
var fs = require("fs");
// node liri.js my-tweets
// This will show your last 20 tweets and when
// they were created at in your terminal/bash window.
var showTweets = function(tweets) {
	tweets.slice(0,20).forEach(function(item, i) {
		console.log("Date: " + tweets[i].created_at);
		console.log("Text: " + tweets[i].text);
	})
}

var myTweets = function() {
	var params = {screen_name: 'Throwaway_codey'}
	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			showTweets(tweets);
		} else {
			console.log("error!" + error);
		}
	});
}
// /////////////////////////////////////////////////////////////////////////////

var spotifySong = function(name) {
	if (name) {
		console.log('name exists');
		spotify.search({ type: 'track', query: name, limit: 1}, function(err, data) {
  		if (err) {
    return console.log('Error occurred: ' + err);
  	}
  		var song = data.tracks.items[0];
			console.log('Artist: ' + song.artists[0].name);
			console.log('Track: ' + song.name);
			console.log('Link: ' + song.preview_url);
			console.log('Album: ' + song.album.name) 
		});
	} else {
			spotify
			.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
  		.then(function(data) {
  			console.log(data);
  			console.log('Artist: ' + data.artists[0].name)
  			console.log('Track: ' + data.name);
  			console.log('Link: ' + data.preview_url);
  			console.log('Album: ' + data.album.name);
  			});

		}
};

var movieThis = function(name) {
	if (name) {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=' + name, function(error, response,body) {
				showMovie(error, response, body) 
		});
	}
	else {
		request('http://www.omdbapi.com/?apikey=40e9cece&i=tt0485947', function(error, response,body) {
			showMovie(error, response, body)
		})
	}	
}

var showMovie = function(error, response, body) {
	var bodyobj = JSON.parse(body);
	console.log("Title: " + bodyobj.Title);
	console.log("Release Year: " + bodyobj.Year);
	console.log("IMDB Rating: " + bodyobj.imdbRating);
	console.log("Rotten Tomatoes Rating: " + bodyobj.Ratings[1].Value);
	console.log("Country: " + bodyobj.Country);
	console.log("Language: " + bodyobj.Language);
	console.log("Plot: " + bodyobj.Plot);
	console.log("Actors: " + bodyobj.Actors);
}

var doWhatItSays = function() {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }
	  else {
	  	console.log(data);
	  	var dataArr = data.split(",")
	  	spotifySong(dataArr[1])
	  }
	});
}

switch (process.argv[2]) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifySong(process.argv[3]);
		break;
	case "movie-this":
		movieThis(process.argv[3]);
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
}