const express = require("express");
const router = express.Router();

const { getAlbumTracks } = require("../controllers/albumController");

router.get("/getAlbumTracks", getAlbumTracks);

module.exports = router;
