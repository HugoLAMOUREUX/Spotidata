const express = require("express");
const router = express.Router();
const { getPlaylistDetails } = require("../controllers/playListController");
const { getTopTrends } = require("../controllers/playListController");
const { getUserPlaylists } = require("../controllers/playListController");

router.get("/getTopTrends", getTopTrends);

router.get("/getUserPlaylists", getUserPlaylists);

router.get("/getPlaylistDetails", getPlaylistDetails);

module.exports = router;
