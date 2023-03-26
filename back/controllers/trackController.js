const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });

/*

        API SPOTIFY TEST with Client credentials
https://developer.spotify.com/documentation/general/guides/authorization/
*/
/*
// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
});


 //Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    // Get multiple albums
    spotifyApi
      .getAlbums(["5U4W9E5WsYb2jUQWePT8Xm", "3KyVcddATClQKIdtaap4bV"])
      .then(
        function (data) {
          console.log("Albums information", data.body);
        },
        function (err) {
          console.error(err);
        }
      );
    spotifyApi.searchArtists("Dua Lip").then(function (data) {
      console.log("Searched Artists", data.body.artists.items);
    });
  },
  function (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

        API TEST SPOTIFY END
*/

/*      

        API SPOTIFY TEST with Implicit Grant flow

*/

/*      

        API SPOTIFY TEST  END with Implicit Grant flow

*/

const getTrackInfo = (req, res) => {
  if (!req.body.track) {
    res.status(400);
    throw new Error("Please add the spotify tracks you want");
  }
  res.status(200).json({ test: "ok" });
};

module.exports = { getTrackInfo };
