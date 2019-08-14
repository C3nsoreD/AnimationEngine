//create express variable to utilise express variable
var express = require('express');

//create app variabl to use express module
var app = express();

//setting the view engine used in conjunction with mvc
app.set('view engine','ejs');

//set middleware like css for this simple file
app.use(express.static('./asserts'));

app.use(express.static('./node_modules'));

//reference the homecontroller 
var homeController = require('./controller/homeController.js');

//use the home controller variable to send the express module
homeController(app);

//start the server
app.listen(7000);

//display start message to console.
console.log('listening to port 7000');