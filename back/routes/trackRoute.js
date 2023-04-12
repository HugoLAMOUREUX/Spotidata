const express = require("express");
const router = express.Router();
const { getTrackInfo } = require("../controllers/trackController");


router.get("/getTrackInfo", getTrackInfo);


module.exports = router;
