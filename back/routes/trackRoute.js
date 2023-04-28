const express = require("express");
const router = express.Router();
const { getTrackInfo, getTrackDetails, getTracksDetails } = require("../controllers/trackController");

router.get("/getTrackInfo", getTrackInfo);

router.get("/getTrackDetails", getTrackDetails);

router.get("/getTracksDetails", getTracksDetails);


module.exports = router;
