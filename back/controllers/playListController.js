const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });



const getPlaylistTracks = async (req,res) => {
    // Get tracks in an album
    var spotifyApi = new SpotifyWebApi({
        accessToken: req.body.access_token
    });
    spotifyApi.getPlaylistTracks(req.body.playlist_id, { limit : 50, offset : 1 })
    .then(function(data) {
        res.status(200).json(data.body);
    }, function(err) {
        res.status(400);
        console.log(err);
        throw new Error("An error occurred when retrieving the playlist tracks");
    });
}

const getTopTrends = async (req, res) => {  
    //get the tracks from the top 50 songs on spotify
    const topSongSpotifyPlaylistId = "37i9dQZEVXbMDoHDwVN2tF";
    req.body.playlist_id = topSongSpotifyPlaylistId;
    getPlaylistTracks(req, res);
}

module.exports = { getTopTrends, getPlaylistTracks };