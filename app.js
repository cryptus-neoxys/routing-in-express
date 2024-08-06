const express = require("express");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const { blogRouter } = require("./routes/blog.route");
const { healthRouter } = require("./routes/health");
const { authRouter } = require("./routes/auth.routes");
const { MONGO_URI } = require("./env");
const { logger } = require("./middleware/logger");

const PORT = 8080;
const app = express();

require("dotenv").config();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(logger);

// Passport.js
// const ppConfig = require('./config/passport')
// ppConfig(passport)
// ==
require("./config/passport")(passport);
app.use(
  session({
    secret: process.env["SESSION_SECRET"],
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/health", healthRouter);
app.use("/blog", blogRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
  mongoose.connect(MONGO_URI);
});
