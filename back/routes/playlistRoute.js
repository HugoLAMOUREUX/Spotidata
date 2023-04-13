const express = require("express");
const router = express.Router();
const {
  getPlaylistTracks,
  getTopTrends,
  getUserPlaylists,
} = require("../controllers/playListController");

router.get("/getPlaylistTracks", getPlaylistTracks);

router.get("/getTopTrends", getTopTrends);

router.get("/getUserPlaylists", getUserPlaylists);

module.exports = router;
