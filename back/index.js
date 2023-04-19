const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

//to pass data in the body : middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//middleware to allow access control allow origin
app.use(cors());
//add the routes related to tracks
app.use("/api/spotify", require("./routes/trackRoute"));

//add the routes related to playlists
app.use("/api/spotify", require("./routes/playlistRoute"));
//add the routes realted to artist
app.use("/api/spotify", require("./routes/artistRoute"));
//to see the error messages
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
