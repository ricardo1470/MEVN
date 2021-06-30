const express = require("express");
const { urlencoded } = require("express");
// import cors
var cors = require("cors");
// import morgan
const morgan = require("morgan");
// import path
const path = require("path");
// import http-errors
var createError = require("http-errors");
//favicon
var favicon = require("serve-favicon");
// port assignment
const port = 9000 || process.env.PORT;

const routesProject = require("./routes/index");
// eject express
const app = express();

// serttings

//Response Dev Status
app.use(morgan("dev"));

// middlewares
app.use(cors());
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))

// routes

// catch 404 and forward to error handler


// listen server on port
app.listen(port, function () {
    console.log(`CORS-enabled, web server listening on port: ${port}`);
});

// process terminated
process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Process terminated");
    });
});
