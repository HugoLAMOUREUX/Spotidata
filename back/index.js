const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 5000;

const app = express();

//to pass data in the body : middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//add the routes related to tracks
app.use("/api/spotify", require("./routes/trackRoute"));

//to see the error messages
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
