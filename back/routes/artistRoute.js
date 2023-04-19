const express = require("express");
const router = express.Router();

const { getArtist } = require("../controllers/artistController");

router.get("/getArtistInfo", getArtist);

module.exports = router;
