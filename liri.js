require("dotenv").config();
var fs = require('fs');
var keys = require('./keys');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
if

// prints `34e84d93de6a4650815e5420e0` to the console
console.log(process.env.SPOTIFY_ID) 

// prints `5162cd8b5cf940f48702df` to the console
console.log(process.env.SPOTIFY_SECRET)
// etc.
