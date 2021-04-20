const express = require("express") ;
const path = require("path") ;
const hbs = require("hbs") ;
const app = express() ;
var fs = require('fs');
 var fileupload = require("express-fileupload");
const port = process.env.PORT || 8000 ;
let alert=require('alert')

var db = require("./connection")

var localStorage = require("localStorage")

const bodyParser = require('body-parser');

var multer = require('multer');

//require('dotenv/config');

//app.use(express.json({extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false  
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json({ type: 'application/*+json' }));

//public static path
const staticPath = path.join(__dirname, "../public") ;
const template_path = path.join(__dirname, "../templates/views") ;
const partials_Path = path.join(__dirname, "../templates/partials") ;

app.set("view engine","hbs") ;
app.set("views",template_path)

// hbs register partials
hbs.registerPartials(partials_Path) ;

app.use(express.static(staticPath)) ;

 app.use(fileupload());


var storePatientEmail =""



//routing
app.get("",(req,res)=> {
    res.render('index')
}) ;

app.get("/about",(req,res)=> {
    res.render('about')
}) ;

app.get("/login",(req,res)=> {
    res.render('login')
}) ;

app.get("/DoctorLogin",(req,res)=> {
    res.render('DoctorLogin')
}) ;

app.get("/PatientLogin",(req,res)=> {
    res.render('PatientLogin')
}) ;

app.get("/DoctorSignUp",(req,res)=> {
    res.render('DoctorSignUp')
}) ;

app.get("/PatientSignUp",(req,res)=> {
    res.render('PatientSignUp')
}) ;

app.get("/PatientThings",(req,res)=> {
    res.render('PatientThings')
}) ;

app.get("/updateInfo",(req,res)=> {

    var email = req.query.patname
    var email = localStorage.getItem("pattoken")
     console.log("token is : "+email)

    let sql2 = "SELECT  * FROM Auth where token='"+email+"' ";

    db.all(sql2, [], (err, rows1) => {
        if (err) {
        throw err;
         }
         if(rows1.length>0)
         {
            let sql = "SELECT  * FROM PatientInfo where patemail='"+email+"' ";
            console.log(sql)
            db.all(sql, [], (err, rows) => {
                if (err) {
                throw err;
                 }
                 //console.log(rows)
                 var patname = rows[0].patname
                 var pataddress = rows[0].pataddress
                 var patcontact = rows[0].patcontact
                 var patpassword = rows[0].patpassword
                res.render("UpdatePatientInfo",{
                    patname : patname,
                    pataddress : pataddress,
                    patcontact : patcontact,
                    patpassword :patpassword
                })
            });
         }
         else{
             res.render("PatientLogin")
         }
        });
       

}) ;

app.post("/UpdateValues",function(req,res){

     var email = localStorage.getItem("pattoken")
     console.log(email)

    let sql2 = "SELECT  * FROM Auth where token='"+email+"' ";
   // console.log(sql)
        db.all(sql2, [], (err, rows1) => {
            if (err) {
            throw err;
             }
             //console.log(rows)
            if(rows1.length>0)
            {
                var patname = req.body.patname
                var pataddress = req.body.pataddress
                var patpassword = req.body.patpassword
                var patcontact = req.body.patcontact
            
                let sql = "update  PatientInfo set patname='"+patname+"', pataddress='"+pataddress+"', patcontact='"+patcontact+"', patpassword='"+patpassword+"'  where patemail='"+storePatientEmail+"' ";   
                //console.log(sql)
                    db.all(sql, [], (err, rows) => {
                    if (err) {
                    throw err;
                        }
            
                        let sql2 = "SELECT  * FROM DoctorsInfo";
            
                        db.all(sql2, [], (err, docrows) => {
                            if (err) {
                                throw err;
                            }
                            res.render("PatientThings",{doctData :docrows })
                        });
                    
                });
            }
            else{
                alert("User is not authenticated")
                res.render("PatientLogin")
            }
        });

    

})


const abc = path.join(__dirname, "../uploads") ;



const upload = multer({ dest: abc }).single('image');
console.log(abc)
app.post('/SaveDoctorsInfo',function(req, res) {
    
    
   // console.log(req.body)
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var username = req.body.username
    var password = req.body.password
    var hospital = req.body.hospital
    var experience = req.body.experience
    var contact = req.body.contact
    var pincode = req.body.pincode
    var state = req.body.state
    
    var img ;
    //var img = req.files
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        img = req.files ;
       // console.log(img)
       let sql = "SELECT  username FROM DoctorsInfo where username='"+username+"' ";
       

        db.all(sql, [], (err, rows) => {
            if (err) {
            throw err;
             }
            
            if(rows.length>0)
            {
                alert("username already exists")
                res.render("DoctorSignUp")
            }
        });

        db.run(`insert into DoctorsInfo(firstname,lastname,username,password,hospital,experience,contact,pincode,state,image) values(?,?,?,?,?,?,?,?,?,?)`,[firstname,lastname,username,password,hospital,experience,contact,pincode,state,img.image.data], function(err,row){
            if(err){
                console.log(err.message)
            }
            else{
                console.log("entry added")
                res.render("login")
            }
        })
    });
   
   

});


const patupload = multer({ dest: abc }).single('patimage');

app.post('/SavePatientInfo',function(req, res) {
    

   // console.log(req.body)
    var patname = req.body.patname
    var pataddress = req.body.pataddress
    var patemail = req.body.patemail
    var patcontact = req.body.patcontact
    var patpassword = req.body.patpassword
    var cc=req.body.countrycode
    console.log(cc)
    var img ;
    //var img = req.files
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        img = req.files ;
       // console.log(img)
       let sql = "SELECT  patemail FROM PatientInfo where patemail='"+patemail+"' ";
       

        db.all(sql, [], (err, rows) => {
            if (err) {
            throw err;
             }
           
            if(rows.length>0)
            {
                alert("username already exists")
                res.render("PatientSignUp")
            }
        });

        db.run(`insert into PatientInfo(patname,pataddress,patemail,patcontact,patpassword,patimage,patcc) values(?,?,?,?,?,?,?)`,[patname,pataddress,patemail,patcontact,patpassword,img.patimage.data,cc], function(err,row){
            if(err){
                console.log(err.message)
            }
            else{
                console.log("entry added")
                res.render("PatientLogin")
            }
        })
    });
   
   

});


// patient login validation

app.post('/PatientLoginValidate',function(req, res) {
    
    var patemail = req.body.patemail
    var patpassword = req.body.patpassword
       let sql = "SELECT  patemail FROM PatientInfo where patemail='"+patemail+"' and patpassword='"+patpassword+"' ";
      // console.log(sql)

        db.all(sql, [], (err, rows) => {
            if (err) {
            throw err;
             }
            
            if(rows.length>0)
            {

                //storePatientEmail = patemail
                    db.run(`insert into Auth(token,email) values(?,?)`,[patemail,patemail], function(err,row){
                        if(err){
                            console.log(err.message)
                        }
                        else{
                            localStorage.setItem("pattoken", patemail);
                        }
                        
                    })

                    


                   let sql2 = "SELECT  * FROM DoctorsInfo";

                    db.all(sql2, [], (err, docrows) => {
                        if (err) {
                        throw err;
                        }
                       // console.log(docrows)
                        res.render("PatientThings",{doctData :docrows })
                    });
            }
            else{
                alert("username or password is not correct")
                res.render("PatientLogin")
            }
        });
   

});


app.get('/bookAppointmentPage',function(req, res) {
    
    
    let sql2 = "SELECT  * FROM DoctorsInfo";

    db.all(sql2, [], (err, docrows) => {
        if (err) {
            throw err;
        }
        //console.log(docrows)
        res.render("PatientThings",{doctData :docrows })
    });
   

});




app.post('/BookAppointment',function(req, res) {
        
    var DoctID = req.body.bookAppoint

    db.run(`insert into AppointmentInfo(DoctID,PatID) values(?,?)`,[DoctID,storePatientEmail], function(err,row){
        if(err){
            console.log(err.message)
        }
        else{
            let sql2 = "SELECT  * FROM DoctorsInfo";

                    db.all(sql2, [], (err, docrows) => {
                        if (err) {
                        throw err;
                        }
                        //console.log(docrows)
                        alert("Your Appointment is Confirmed")
                        res.render("PatientThings",{doctData :docrows })
                    });
        }
    })
});


//APIsss

app.get("/api/fetchDoctors", (req, res, next) => {
    var sql = "select firstname as DoctorName, count(*) as NumOfPatients ,hospital as Hospital from AppointmentInfo ,DoctorsInfo where DoctID=username group by(DoctID);" ;

    //console.log(sql) ;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/patients", (req, res, next) => {
    var doctid = req.query.DoctID 
    console.log(doctid)
    //var sql = "select PatID as Patient  from AppointmentInfo where DoctID='"+doctid+"' order by(PatID);" ;
    

    
    var sql = "select patname as PatientName , patemail as Email, patcontact as Contact from PatientInfo, AppointmentInfo where patemail = PatID and DoctID='"+doctid+"' order by(patname);"
    
    //console.log(sql) ;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/PatientLogout", (req, res) => {

    var email = localStorage.getItem("pattoken")

    var sql = "delete  from Auth where email='"+email+"' ;" ;
        
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.render("PatientLogin")
      });

    
});



app.get("*",(req,res)=> {
    res.render('404error',{
        errorMsg:"Oops! Page Not Found"
    })
}) ;

app.listen(port,() => {
    console.log(`listening to the port at ${port} `)
})