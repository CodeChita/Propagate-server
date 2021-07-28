// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//---------------------------------------------------------
// -------- session config---------
//---------------------------------------------------------
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, 
    resave: false, 
    cookie: {
      maxAge: 1000*60*60*24*7// is in milliseconds.  expiring in 7 days
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/Propagate",
      ttl: 60*60*24, // is in seconds. expiring in 1 day
    })
}));



// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const userRoutes = require("./routes/user.routes")
app.use("/api", userRoutes)

const authRoutes = require("./routes/auth.routes")
app.use("/api", authRoutes)

 const apiRoutes = require("./routes/api.routes")
 app.use("/api", apiRoutes)

 const chatRoutes = require("./routes/chat.routes")
 app.use("/api/chat", chatRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
