const express = require("express");
const router = express.Router();
const { getPlaylistTracks } = require("../controllers/playlistController");
const { getTopTrends } = require("../controllers/playlistController");
const { getUserPlaylists } = require("../controllers/playlistController");

router.get("/getTopTrends", getTopTrends);

router.get("/getUserPlaylists", getUserPlaylists);

router.get("/getPlaylistDetails", getPlaylistDetails);

module.exports = router;
