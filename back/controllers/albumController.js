const SpotifyWebApi = require("spotify-web-api-node");

const getAlbumTracks = async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
  });
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      // set the access token
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.getAlbumTracks(req.body.album_id, { limit : 50, offset : 0 })
      .then(
        function(data) {
          console.log(data.body);
        }, 
        function(err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  );
  
};

module.exports = { getAlbumTracks };
