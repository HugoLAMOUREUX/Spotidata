const express = require("express");
const router = express.Router();
const { getUserTop, getAnalysis, getUserPlaylists } = require("../controllers/userController");

router.get("/getUserTop", getUserTop);

router.get("/getUserPlaylists", getUserPlaylists);

router.get("/getAnalysis", getAnalysis);

module.exports = router;