var express = require('express');
var parser = require('body-parser');
var path = require('path');
var app = express();
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(function(req,res,next){
    res.locals.userValue = null;
    next();
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'app_views'))




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


var urlencodedParser = parser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.get('/sendData', urlencodedParser, function (req, res) {
    console.log(req.body.email) ;
    res.send('welcome, ' + req.body.email) ;
});
//
//
// app.get('/',function(req,res){
//     res.render('home',{
//         topicHead : 'Student Form',
//     });
//     console.log('user accessing Home page');
// });
// app.post('/student/add',function(req,res){
//     var student = {
//         first : req.body.fname,
//         last : req.body.lname
//     }
//     console.log(student);
//     res.render('home',{
//         userValue : student,
//         topicHead : 'Student Form'
//     });
//     //res.json(student);
//
// });
app.listen(5000,function(){
    console.log('server running on port 5000');
})