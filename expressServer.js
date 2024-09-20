const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const personRouter = require("./routes/personRouter");
const menuRouter = require("./routes/menuRouter");
const db = require("./db");
const app = express();
app.use(bodyParser.json());
const passport = require("./authentication/auth");
app.use(passport.initialize());

// Middleware Funtion
//Example 1
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleDateString()} Request Made to : ${req.url}`
  );
  next(); // If this function is executed now you can go ahead processing
};
// Using Passport
const localMiddleware = passport.authenticate("local", { session: false });

app.get("/", localMiddleware, (req, res) => {
  res.send("Welcome To Hotel");
});
app.use("/person", personRouter);
app.use("/menu", localMiddleware, menuRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port no ${port}`);
});

module.exports = app;
