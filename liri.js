////////////////////////////////////////////////////////////////////////////////////
require("dotenv").config();
var keys = require('./keys.js');
var moment = require('moment');
var axios = require("axios");
var spotifyAPI = require("node-spotify-api");
var fs = require("fs");
var args = process.argv.slice(2);
var command = args[0];
var userInput = args.slice(1).join(" ");

if (command === "concert-this") {
  concertThis();
} else if (command === "spotify-this-song") {
  spotifyThis();
} else if (command === "movie-this") {
  movieThis();
} else if (command === "do-what-it-says") {
  doWhatItSays();
} else {
  console.log("I'm sorry, I don't understand. Please tell me a command: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
}

//Add Function Defination////////////////////////////////
function concertThis() {
  console.log("Enter concertThis....");
  var isInputNull = userInput === "" ? userInput = "Shawn Mendes" : userInput = userInput;
  var queryUrl = "https://rest.bandsintown.com/artists/" + isInputNull + "/events?app_id=" + keys.bandAPI.apiKey + "&date=upcoming"
  axios.get(queryUrl).then(
    function (response) {
       var data = response.data;
      //  var location = {
      //    Name:name,
      //    City:city,
      //    Region:region,
      //    Country:country
      //  }
       console.log(data);
      console.log("Name of the venue: " + data.name);
      console.log("Venue location: " + response.data[0].VenueData);
      console.log("Date of the Event: " + moment(response.data[0].datetime).format("MMDDYYYY"));
      //Enable log file
      fs.appendFile("log.txt", "\n" + "Appending this concert information: " +
        "\n--------------------------------------------------------------" +
        "\n" + response.data[0].artist_id + "\n" + response.data[0].datetime +
        "\n" + response.data[0].imdbRating +
        "\n--------------------------------------------------------------", function (err) {
          if (err) {
            console.log(err);
          }
        })
    }, function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  );
}
function spotifyThis() {
  console.log("Enter spotifyThis....");
  var isInputNull = userInput === "" ? userInput = "The Sign" : userInput = userInput;
  var spotify = new spotifyAPI(keys.spotify);

  spotify.search({
    type: "track",
    query: userInput,
    limit: 1
  }, function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // artist's name
      console.log("Song name: " + data.tracks.items[0].name) // song name
      console.log("External url: " + data.tracks.items[0].album.external_urls.spotify) // external link
      console.log("Album: " + data.tracks.items[0].album.name) // album name
    }

    fs.appendFile("log.txt", "\nAppending this song and artist data: " +
      "\n--------------------------------------------------------------" +
      "\n" + data.tracks.items[0].album.artists[0].name +
      "\n" + data.tracks.items[0].name +
      "\n" + data.tracks.items[0].album.external_urls.spotify +
      "\n" + data.tracks.items[0].album.name +
      "\n--------------------------------------------------------------", function (err) {
        if (err) {
          console.log(err);
        }
      })
  })
}

function movieThis() {
  var isInputNull = userInput === "" ? userInput = "Mr. Nobody" : userInput = userInput;
  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + keys.omdbAPI.apiKey;
  //Call Axios//
  axios.get(queryUrl).then(
    function (response) {
      var rottenExists = response.data.Ratings[1] === undefined ? rottenExists = "N/A" : rottenExists = response.data.Ratings[1].Value;
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + rottenExists);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      //Enable log file
      fs.appendFile("log.txt", "\n" + "Appending this movie information: " +
        "\n--------------------------------------------------------------" +
        "\n" + response.data.Title + "\n" + response.data.Year +
        "\n" + response.data.imdbRating + "\n" + response.data.rottenExists +
        "\n" + response.data.Country + "\n" + response.data.Language +
        "\n" + response.data.Plot + "\n" + response.data.Actors +
        "\n--------------------------------------------------------------", function (err) {
          if (err) {
            console.log(err);
          }
        })
    }, function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  );
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    } else {
      var dataArr = data.split(",");
      userInput = dataArr[1];
      command = dataArr[0];

      if (command === "spotify-this-song") {
        spotifyThis();
      } else if (command === "concert-this") {
        concertThis();
      } else {
        movieThis();
      }
    }

    fs.appendFile("log.txt", "User engaged the random file.", function (err) {
      if (err) {
        console.log(err);
      }
    })
  });
}
////////END///////////////////////////////