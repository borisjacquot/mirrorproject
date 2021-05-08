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

const token =
  "BQBiOFEwbe1_7R7DhdYOq9Nv5oRqQUTFCM3xajMTSi7H6R0kOSzsZJofsRhocQ2_AJPR1yYbe8BIRBkh2sd_Va8LmHCXqcS46JcbCYvnAO5qh61EFp5RmF9Rpfh0S7IyONg4vP7k20MYvxwhbY6bWXiDKfJpunNvc48nHi6oY9vCIXIyxpFBqvmxtgLzQ-KSxgjCpLTAfnGUmoCrZYmPqyBjzLZyElxG3_J542XMmb4uVBNZ8ufPOUynPKib28Yu2pAdTps4xUaSgPHOH0UIeQsDmDUG-1eL2WP3m0VLQB7R";

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
            var artists =data.body.item.artists[0].name;
            data.body.item.artists.slice(1).forEach(element => {
                artists += ", " + element.name;
            });
            myCurrentPlay.Artists=artists;
            myCurrentPlay.Name=data.body.item.name;
        },
        function (err) {
            console.log("Something went wrong!", err);
        }
        );
    });
    await sleep(500);
    return myCurrentPlay;
};


