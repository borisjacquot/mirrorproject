var SpotifyWebApi = require("spotify-web-api-node");
const superagent = require('superagent');

/**
 * This example retrieves an access token using the Client Credentials Flow, documented at:
 * https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
 */

/**
 * Get the credentials from Spotify's Dashboard page.
 * https://developer.spotify.com/dashboard/applications
 */

/* {
    clientId: "ee2479b6652449c18acdf6e8e83ddc43",
    clientSecret: "32b4e75555f549e990f8b16da8d6b250",
  }*/
const spotifyApi = new SpotifyWebApi();

// Pour avoir le token, go sur https://developer.spotify.com/console/get-users-currently-playing-track/ et faire getToken et cocher toutes les permissions.
const token =
  "BQAcAx8UWmfSu35FfLXJCNGyN7zHp4LuZP8RSPXWvavICTZ5JCiRjb-pj6XbZsWE2Hxwn9jFnXZ5mtuJNvSY9Y9ntcEL_YYeRLtyHTaxjunsqBf6vtdOYc8Y1-dNDX1kogcRB8Nqg6XyTjN4pxAoCMDFysh04QMCmFkddViN4qgaB19QO9_ZgPNKJ4Av7Nv4jSZRl1ox0ZfEwNujq5W0mRWePdO_RzI6pq5wBZ-rVF9YUgmgUYUQPBolqehxaoRTAMBWSwK4lEcNHrJ2e17G87B8fATIwTF5jc3mMBO5hWGr";


  /*
var redirect ="";

superagent.get('http://localhost:8888/login')
.end((err, res) => {
if (err) { return console.log(err); }
    console.log(res.redire);
})*/
  



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

spotifyApi.setAccessToken(token);
module.exports.spotify = async function(){
    var myCurrentPlay ={"isPlaying":true, "Artists":"", "Name":""};
    const promise1 = new Promise((resolve, reject) => {
        spotifyApi.getMyCurrentPlaybackState().then(
        function (data) {
            // Output items
            if (data.body && data.body.is_playing) {
                myCurrentPlay.isPlaying = true;
            } else {
                myCurrentPlay.isPlaying = false;
            }
        },
        function (err) {
            console.log("Something went wrong!", err);
        }
        );

        spotifyApi.getMyCurrentPlayingTrack().then(
        function (data) {
            if (data.body.item){
                var artists =data.body.item.artists[0].name;
                data.body.item.artists.slice(1).forEach(element => {
                    artists += ", " + element.name;
                });
                myCurrentPlay.Artists=artists;
                myCurrentPlay.Name=data.body.item.name;
            }
        },
        function (err) {
            console.log("Something went wrong!", err);
        }
        );
    });
    await sleep(500);
    return myCurrentPlay;
};


