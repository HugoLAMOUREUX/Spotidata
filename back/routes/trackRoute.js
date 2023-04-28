const express = require("express");
const router = express.Router();
const { getTrackInfo, getUserTop, getAnalysis} = require("../controllers/trackController");

router.get("/getTrackInfo", getTrackInfo);

router.get("/getUserTop", getUserTop);

router.get("/getAnalysis", getAnalysis);

module.exports = router;
