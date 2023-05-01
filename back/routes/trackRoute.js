const express = require("express");
const router = express.Router();
const { getTrackInfo, getUserTop } = require("../controllers/trackController");

router.get("/getTrackInfo", getTrackInfo);

router.get("/getUserTop", getUserTop);


module.exports = router;
