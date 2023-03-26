const express = require("express");
const router = express.Router();
const { getPlaylistTracks } = require("../controllers/playlistController");
const { getTopTrends } = require("../controllers/playlistController");


router.get("/getPlaylistTracks", getPlaylistTracks);

router.get("/getTopTrends", getTopTrends);

module.exports = router;
