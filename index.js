const express = require("express");
const mongoose = require("mongoose");

const conn=require('./conn');
const bodyParser = require("body-parser");
const path = require("path");
const routeAdmin =require("./routeAdmin");
const routeTrainer =require("./trainerRoting");
const app = express();
app.use(bodyParser.urlencoded({ limit: "5000mb",extended: true }));
// extend = true tue use the qs u=insted of query to get data
// extend =false ==> will use tje query string




app.set("view engine", "ejs");
app.set("views", "views");


app.use('/admin',routeAdmin);
app.use('/trainer',routeTrainer);

// app.use("/assets", express.static("assets"));
app.use("/assets" ,express.static( path.join( __dirname,"assets")));

//to get the static file that we import at from html file


function courses(){
    var c=[];


    var query= `select * from  courses `;
    conn.query(query,(error, result) => {
        c.push( result);

    });

    return c;
}


let studentShema=mongoose.Schema({
    name:String,
    phone:String,
    birth_date: String,
    email: String,
    s_state:Number
});
let Student=mongoose.model('student',studentShema);

app.get('/addStudent', function(req, res) {
    var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

    res.render('index', {
        pageTittle:"Manage Student",
        courses:courses(),
        drinks: drinks,
        tagline: tagline
    });
});

app.all('/sendData', function (req, ressponse) {
const dbURL='mongodb://localhost:27017/codingAcademy';
mongoose.connect(dbURL,{useNewUrlParser:true},(err)=>{
        if(err)
            console.log('mongo db Not connect');
        else
        {
            console.log('mongo db connect');

            let student =new Student({
                name:req.body.name,
                    email:req.body.email,
                    birth_date:req.body.birth_date,
                    phone:req.body.phone,
                    s_state:0
            })
            student.save((err,result)=>{
                console.log('reeeeeeeeeeeeeeeee'+ result);
                mongoose.disconnect();
                ressponse.redirect('/addStudent');
            });


        }


    });

});



app.get('/showStudent', function (req, ressponse) {
  var       query= `select *, timestampdiff(year ,birth_date ,now()) as age from  student `;
        conn.query(query,(error, result) => {
            ////////console.log(error);
            if (result) {
                console.log(error);
            }
            if (typeof result[0] !== "undefined")
            {
                ressponse.render('showStudent', {
                    pageTittle:"Manage Student",
                    result: result,
                    courses:courses()
                });
            }

        });

});


app.get('/showTrainer', function (req, ressponse) {
  var       query= `select *, timestampdiff(year ,birth_date ,now()) as age from  trainer `;
        conn.query(query,(error, result) => {
            ////////console.log(error);
            if (result) {
                console.log(error);
            }
            if (typeof result[0] !== "undefined")
            {
                ressponse.render('showTrainer', {
                    pageTittle:"Manage Trainer",
                    result: result,
                    courses:courses()

                });
            }

        });

});

app.get('/showOpenCources', function (req, ressponse) {
  var       query= `select DATE_FORMAT(opened_course.end_date, "%Y-%b-%e") as end_date  ,DATE_FORMAT(opened_course.start_date, "%Y-%b-%e") as start_date  ,DATE_FORMAT(opened_course.end_register, "%Y-%b-%e") as end_register  ,trainer.name as trainer_name ,courses.name_en as  course_name  from opened_course
inner join trainer on opened_course.trainer_id= trainer.id
inner join courses on opened_course.course_id= courses.id
where timestampdiff(day ,now(),end_register ) >=0 ;
 `;
    // select * from opened_course where timestampdiff(day ,now(),end_register ) >=0 ;
        conn.query(query,(error, result) => {
            ////////console.log(error);
            if (result) {
                console.log(error);
            }
            if (typeof result[0] !== "undefined")
            {
                ressponse.render('showOpenCources', {
                    pageTittle:" Results",
                    result: result,
                    courses:courses()

                });
            }

        });

});



app.get('/showAllOpenCources', function (req, ressponse) {
  var       query= `select DATE_FORMAT(opened_course.end_date, "%Y-%b-%e") as end_date  ,DATE_FORMAT(opened_course.start_date, "%Y-%b-%e") as start_date  ,DATE_FORMAT(opened_course.end_register, "%Y-%b-%e") as end_register  ,trainer.name as trainer_name ,courses.name_en as  course_name  from opened_course
inner join trainer on opened_course.trainer_id= trainer.id
inner join courses on opened_course.course_id= courses.id
 `;
    // select * from opened_course where timestampdiff(day ,now(),end_register ) >=0 ;
        conn.query(query,(error, result) => {
            ////////console.log(error);
            if (result) {
                console.log(error);
            }
            if (typeof result[0] !== "undefined")
            {
                ressponse.render('showOpenCources', {
                    pageTittle:"Manage Cources",
                    result: result,
                    courses:courses()

                });
            }

        });

});


app.get('/allAdvertiserView', function (req, ressponse) {
  var       query= `select *, timestampdiff(year ,birth_date ,now()) as age from  student `;
        conn.query(query,(error, result) => {
            ////////console.log(error);
            if (result) {
                console.log(error);
            }
            if (typeof result[0] !== "undefined")
            {
                ressponse.render('allAdvertiserView', {
                    pageTittle:"Manage Cources",
                    result: result,
                    courses:courses()
                });
            }

        });

});



app.get('/showResult', function (req, ressponse) {
// app.get('/showResult/:id', function (req, ressponse) {
// console.log('id  . .. ' + req.param("id") );
console.log('req.query . .. ' + req.query );
console.log('req.params.id . .. ' + req.params );
var id =req.query.id;

    var query=``;
if(id>0){
    query= `select student.name as "student_name",courses.name_en as "courses_name",
 trainer.name as "trainer_name" ,courses.duration ,
  DATE_FORMAT(opened_course.start_date, "%Y-%b-%e") as start_date ,DATE_FORMAT(opened_course.end_date, "%Y-%b-%e") as end_date  ,student_course.student_grade,courses.name_en
from(( student inner join student_course on student.id= student_course.student_id )
inner join opened_course on student_course.opened_course_id= opened_course.id
inner join trainer on opened_course.trainer_id= trainer.id
inner join courses on opened_course.course_id= courses.id)
where courses.id=${id}
`;
}
else
    query= `select student.name as "student_name",courses.name_en as "courses_name",
 trainer.name as "trainer_name" ,courses.duration ,
  DATE_FORMAT(opened_course.start_date, "%Y-%b-%e") as start_date ,DATE_FORMAT(opened_course.end_date, "%Y-%b-%e") as end_date  ,student_course.student_grade,courses.name_en
from(( student inner join student_course on student.id= student_course.student_id )
inner join opened_course on student_course.opened_course_id= opened_course.id
inner join trainer on opened_course.trainer_id= trainer.id
inner join courses on opened_course.course_id= courses.id
)`;

        conn.query(query,(error, result) => {
            ////////console.log(error);
            if (result) {
                console.log(error);
            }
            if (typeof result[0] !== "undefined")
            {
                ressponse.render('showResult', {
                    pageTittle:"Results",
                    result: result,
                    courses:courses()

                });
            }
            else
            {
                ressponse.render('showResult', {
                    pageTittle:"Results",
                    result: [],
                    courses:courses()

                });
            }


        });


});



app.use((req,res)=>
{
    res.send('error 404 ');
})

app.listen(7000, function() {
    console.log("start11" + 7000);
});
