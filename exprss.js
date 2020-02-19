// server.js
// load the things we need
var express = require('express');
var path= require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(path.join(__dirname, 'client')));


// set the view engine to ejs
app.set('view engine', 'ejs');
// app.use(express.urlencoded());

// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get('/', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('index', {
        drinks: drinks,
        tagline: tagline
    });
});


// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.get('/sendData', function (req, res) {
    console.log('email ==   ' +req.body.email) ;
    console.log('pass ==   '+req.body.pswd) ;
    res.send('welcome, ' + req.body.email) ;
});



// // POST /api/users gets JSON bodies
// app.post('/api/users', jsonParser, function (req, res) {
//     // create user in req.body
// })

// about page
// app.get('/about', function(req, res) {
//     res.render('app/about');
// });

app.listen(7000);
console.log('7000 is the magic port');