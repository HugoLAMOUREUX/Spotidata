const express = require("express");
const router = express.Router();
const { getUserTop, getAnalysis, getUserPlaylists, getResume } = require("../controllers/userController");

router.get("/getUserTop", getUserTop);

router.get("/getUserPlaylists", getUserPlaylists);

router.get("/getAnalysis", getAnalysis);

router.get("/getResume", getResume);

module.exports = router;