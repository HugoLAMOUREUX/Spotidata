const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });
var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
});
const getArtist = async (req, res) => {
  // Get tracks in an album
  if (!req.body.access_token) {
    res.json({ msg: "no access token found" });
  }
  spotifyApi.setAccessToken(req.body.access_token);
  spotifyApi.getArtist(req.body.artist_id).then(
    function (data) {
      res.send(data.body).status(200);
    },
    function (err) {
      console.error(err);
    }
  );
};

module.exports = { getArtist };
