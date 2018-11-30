require('dotenv').config();
console.log('keys.js is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
};

exports.omdbAPI = {
  apiKey:process.env.SPOTIFY_API_KEY
}
//module.exports = spotify;
console.log('End Loading keys.js..');