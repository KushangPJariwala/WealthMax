const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./src/db/connection");

const userRouter = require("./src/routes/users");
const bankRouter = require("./src/routes/banks");
const watchlistRouter = require("./src/routes/watchlist");
const dashboard = require("./src/webSockets/dashboadSocket.js");
const marketDetails = require("./src/webSockets/marketDetailsSocket.js");
const watchlistDetails = require("./src/webSockets/watchListData.js");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/bank", bankRouter);
app.use("/watchlist", watchlistRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
