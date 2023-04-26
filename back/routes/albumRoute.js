const express = require("express");
const router = express.Router();

const { getAlbumDetails } = require("../controllers/albumController");

router.get("/getAlbumDetails", getAlbumDetails);

module.exports = router;