const mongoClient = require("mongodb").MongoClient;

mongoClient.connect('mongodb://localhost:27017',(err,clint)=>{
    if(err)
    console.log('mongo db Not connect');
    else
    console.log('mongo db connect');

  let db=  clint.db('firstDB');

  db.collection('users').insertOne() ;

  clint.close();
});

module.exports= mongoClient;

