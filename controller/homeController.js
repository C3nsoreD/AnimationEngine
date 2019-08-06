//a module called app the will be route pages

const path = require('path');
module.exports = function(app){
    
    //responding to user default requests
    app.get('/', function(req,res){
        res.render('index');
    });

    //the method below is used when you are only dealing with 
    //html extension files without using any kind of templating.
    //it doesn't matter any ways because this is just a tes project.
    // app.get('/home', function(req, res){
    //     res.sendFile(path.join(__dirname+'/../views/index.html'));
    // });

};