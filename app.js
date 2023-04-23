const { createServer } = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = 8080;
const app = express();
const server = createServer(app);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie : {
      maxAge: 1000 * 60 * 60 * 24,
    },
}));

//sets up a middleware function so the server can use the json from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("."));

// Set view engine
app.set("view engine", "ejs");
app.set('views', 'views');

//it sets up all the routes with the correct controller
app.use('/', require('./router'));

app.get(['/', '/survey'], function(req, res) { 
  res.render('survey-form', { req : req, res : res});
});

server.listen(port, () => {
    console.log(`SurveyMaker is live on localhost:${port}`);
});