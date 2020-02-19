const  express=require('express');
const bodyParser =require('body-parser');

const route =express.Router();

route.post('/add',(req,res,next)=>{
    res.setHeader('Content-Type','text/html');
    res.send('trainer / add ......')  ;

    console.log(req.body);


});
route.get('/add',(req,res,next)=>{
    console.log(req.body);
       res.render('addTrainer', {
           pageTittle: "manage Trainer",
           // courses:courses(),
           drinks: 'drinks',
        tagline: 'tagline'
    });


});
module.exports=route ;