require("dotenv").config();
var fs = require('fs');
var keys = require('./keys');
var moment = require('moment');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var input = process.argv[3];


// axios.get("http://www.omdbapi.com/?t=the+outsiders&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     console.log("The movie's rating is: " + response.data.imdbRating);
//   }
// );

runLiribot(action, input);
function runLiribot(action, input) {
    switch (action) {
        case 'spotify-this-song':
            input === undefined ? runSpotify('The Sign by Ace of Base') :
                runSpotify(input);
            break;
        case 'concert-this':
            input === undefined ? runBandsInTown('Ferry Corsten') :
                runBandsInTown(input);
            break;
        case 'movie-this':
            input === undefined ? runOMDB('Mr.Nobody') :
                runOMDB(input);
            break;
        case 'do-what-it-says':
            runRandom(action, input);
            break;
    };

};

function runSpotify(input) {
    
    spotify.search({ type: 'track', query: input, limit: 1 }, function (err, song) {
        var song = data.tracks.items[0];
        if (err) {
        console.log('whoops a mistake happened: ' + err);
        }
        console.log("Artists: " + song.artists[0].name);
        console.log("Song Name: " + song.name);
        console.log("Preview Link: " + song.preview_url);
        console.log("Album: " + song.album.name);


        fs.appendFile("log.txt", '\n Artist: ' + song.artists[0].name + '\n Song: ' + song.name
            + '\n Preview Link: ' + song.preview_url + '\n Album: ' +
            song.album.name, function (err) {
                if (err) {
                    console.log(err);
                }
            });
    });
};

function runBandsInTown() {

    var artist = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {

            var events = response.data;

            if (events[0].venue === null) {
                console.log('Sorry no shows are currently listed for that artist');
            } else {
                for (var i = 0; i < events.length; i++) {

                    var venue = ('Venue: ' + events[i].venue.name);
                    var location = ('Location: ' + events[i].venue.city + response.data[0].venue.country);
                    var date = ('Date: ' + moment(events[i].datetime).format("MM/DD/YYYY"));

                    fs.appendFile("log.txt", "\n" + venue
                        + "\n" + location + "\n" + date + "\n", function (err) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("Content Added!")
                            }

                        })
                }
            }


        })
        .catch(function (error) {
            if (error) {
                console.log("No showings listed for that artist currently.");
            }
        });


}

function runOMDB(movie) {
    if (!movie || movie === "") {
        movie = "Mr.Nobody";
        console.log("If you haven't watched 'Mr.Nobody',then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }

    var queryURL = 'https://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy';

    Request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country Produced in: " + JSON.parse(body).Country);
            console.log("Language Movie is in: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("Actors involved in this film: " + JSON.parse(body).Actors);

            fs.appendFile("log.txt", "\n Movie Title: " + JSON.parse(body).Title +
                "\n Year Released: " + JSON.parse(body).Year +
                "\n IMDB Rating: " + JSON.parse(body).imdbRating +
                "\n Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating +
                "\n Country Produced in: " + JSON.parse(body).Country +
                "\n Language Movie is in: " + JSON.parse(body).Language +
                "\n Movie Plot: " + JSON.parse(body).Plot +
                "\n Actors involved in this film: " + JSON.parse(body).Actors, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Content Added!")
                    }
                });
        }

    });
}





