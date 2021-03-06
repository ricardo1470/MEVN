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
//mongoose
const mongoose = require('mongoose');
// port assignment
const port = 9000 || process.env.PORT;

const routesProject = require("./routes/index");
// eject express
const app = express();

//connect database
mongoose.connect('mongodb://localhost/mevn', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

var db = mongoose.connection;

db.on('error', function(err){
    console.log('connection error', err)
});

db.once('open', function(){
    console.log('Connection to DB successful')
});

// settings

//Response Dev Status
app.use(morgan("dev"));

// middlewares
app.use(cors());
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')))
app.use(express.json());

// routes
app.use('/api/tasks', routesProject);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler


// listen server on port
app.listen(port, function () {
    console.log(`CORS-enabled, web server listening on port: ${port}`);
});

// process terminated
process.on("SIGTERM", () => {
    app.close(() => {
        console.log("Process terminated");
    });
});
