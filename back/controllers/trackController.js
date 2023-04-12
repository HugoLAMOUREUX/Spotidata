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

const getTrackDetails = async (spotifyApi, track_id) => {
  let return_value;
  await spotifyApi.getAudioFeaturesForTrack(track_id).then(
    function (data) {
      //delete the data that we don't need
      if(data.body.type){
        delete data.body.type;
      }
      if(data.body.uri){
        delete data.body.uri;
      }
      if(data.body.track_href){
        delete data.body.track_href;
      }
      if(data.body.analysis_url){
        delete data.body.analysis_url;
      }
      if(data.body.id){
        delete data.body.id;
      }

      return_value = data.body;
    },
    function (err) {
      console.log(err);
      return -1;
    }
  );


  await spotifyApi.getTrack(track_id).then(
    function (data_more_info) {
      //add the data that we need
      if(data_more_info.body.album && data_more_info.body.album.genres){
        return_value.genres = data_more_info.body.album.genres;
      }
      if(data_more_info.body.popularity){
        return_value.popularity = data_more_info.body.popularity;
      }
      if(data_more_info.body.artists){
        return_value.artists = data_more_info.body.artists.map((artist) => {
          return {name: artist.name, id: artist.id};
        });
      }
    },
      function (err) {
        console.log("Something went wrong when retrieving the tracks", err);
      }
  );

  return return_value;
};

module.exports = { getTrackInfo, getTrackDetails };
