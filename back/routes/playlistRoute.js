const express = require("express");
const router = express.Router();
const { getTopTrends } = require("../controllers/playListController");
const { getUserPlaylists } = require("../controllers/playListController");
const { getPlaylistDetails } = require("../controllers/playListController");



router.get("/getTopTrends", getTopTrends);

router.get("/getUserPlaylists", getUserPlaylists);

router.get("/getPlaylistDetails", getPlaylistDetails);

module.exports = router;
