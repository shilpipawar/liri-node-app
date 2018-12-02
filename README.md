## liri-node-app
  
####  liri-js. 

# Table of Contents

1. [Introdution](#Introdution)
1. [Features](#Features)
1. [Installing](#installing)
1. [Configuration](#configuration)
1. [Usage](#usage)
1. [Contributing](#contributing)

# Introdution

  LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.! 

# Features

LIRI has 4 commands 

- concert-this

- spotify-this-song

- movie-this

- do-what-it-says

# Installing
- package.json has all required dependencies

```npm install```

# Configuration

To use liri-js, you will need to pass OMDB API key (string), SPOTIFY_ID and SPOTIFY_SECRET and bandsintown apikey into it.

# API
```
var keys = require('./keys.js'); //(OMDB_API_KEY) and (BAND_IN_TOWN_API);
var moment = require('moment');
var axios = require("axios");
var spotifyAPI = require("node-spotify-api");

```

#### Usage
1. concert-this 
- This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
    * Name of the venue
    *  Venue location
    * Date of the Event ("MM/DD/YYYY")
- command to access the feature for concert-this
```node liri.js concert-this <artist/band name here>```

## concertThis()

2. spotify-this-song
- This will show the following information about the song in your terminal/bash window
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
- command to access the feature for concert-this
```node liri.js spotify-this-song '<song name here>```

3. movie-this
  - This will output the following information to your terminal/bash window:
      * Title of the movie.
      * Year the movie came out.
      * IMDB Rating of the movie.
      * Rotten Tomatoes Rating of the movie.
      * Country where the movie was produced.
      * Language of the movie.
      * Plot of the movie.
      * Actors in the movie.
  - command to access the feature for concert-this
  ```node liri.js movie-this '<movie name here>'```

  - Screen Shot:
  ![image](//https://github.com/shilpipawar/liri-node-app/blob/master/ScreenShots/do-what-it-says.png?raw=true "movie-this")

4. do-what-it-says
- Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    * It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    * Edit the text in random.txt to test out the feature for movie-this and concert-this.
- command to access the feature for concert-this
```node liri.js do-what-it-says```

## License
This project is licensed under the MIT License - see the [L