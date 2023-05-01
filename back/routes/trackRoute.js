const express = require("express");
const router = express.Router();
const { getTrackDetails, getTracksDetails } = require("../controllers/trackController");

router.get("/getTrackDetails", getTrackDetails);

router.get("/getTracksDetails", getTracksDetails);

module.exports = router;
