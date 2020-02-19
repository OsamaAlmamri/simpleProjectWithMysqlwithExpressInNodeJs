const  express=require('express');

const route =express.Router()

route.get('/show',(req,res,next)=>{
    res.send('admin/show ......')  ;

});
route.get('/add',(req,res,next)=>{
    res.send('admin / add ......')  ;

});
module.exports=route ;