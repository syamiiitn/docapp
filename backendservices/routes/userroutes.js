const exp=require('express');
//importing database object
const initdb=require('../DBConfig').initdb
const getdb=require('../DBConfig').getdb
const secret='secret'
//importing jwt
const jwt=require('jsonwebtoken')
//intailizing dbo
initdb();
//importing bcrypt
const bcrypt=require('bcrypt')
var userRoutes=exp.Router();

//import nodemailer
const nodemailer=require('nodemailer')

//import twilio
const accountSid = 'AC7c5cb58c60e661a3b01005c76f36cbe5';
const authToken = '65c8ca4aa01687411b8fb4704e93f505';
const client = require('twilio')(accountSid, authToken);


//userRoutes handler patient registration

userRoutes.post('/register/patient',(req,res,next)=>{
    console.log(req.body);
    dbo=getdb();
    // if(req.body.puname=="" || req.body.password=="" || req.body.email=="" || req.body.mobileno=="" || req.body.date=="")
    // {
    //     res.json({message:"please fill the required fields"})
    // }
    // else
    // {
    dbo.collection("patientcollection").find({name:{$eq:req.body.name}}).toArray((err,result)=>
    
    {
        if(result=="")
        {
            bcrypt.hash(req.body.password,4,(err,hashedpwd)=>{
                if(err)
                {
                    next(err);
                }
                else{

                    let transporter=nodemailer.
                    createTransport({
                        service:"gmail",
                        auth:{
                            user:"gundayamini26@gmail.com",
                            pass:"gsr@kmc16"
                        }
                    });
                    let info= transporter.sendMail({
                        //sender address
                        from:'"login details" <gundayamini26@gmail.com>',
                        //list of recivers
                        to:req.body.email,
                        subject:"Patient credentials",//subject line
                        text:`username: ${req.body.name},password: ${req.body.password}`,//plain text body
                        //html:"<b>hiii ra praveen</b>"//htmlbody
                    });



                    //replace the plain text with hashed password
                    req.body.password=hashedpwd;
                    dbo.collection("patientcollection").insertOne(req.body,(err,success)=>{
                        if(err)
                        {
                            console.log('error in patient register')
                        }
                        else{
                            res.json({message:"registration success"})
                        }
                    })
                }
            })
            console.log("Unique Value");    
        }
        else {
            res.json({message:"Duplicate Username"})
            console.log("Duplicate Username");
           
        }
    
    })
//}
    
})



//userRoutes handler doctor registration
userRoutes.post('/register/doctor',(req,res,next)=>{
    console.log(req.body);
    dbo=getdb();
    // if(req.body.puname=="" || req.body.password=="" || req.body.email=="" || req.body.mobileno=="" || req.body.date=="")
    // {
    //     res.json({message:"please fill the required fields"})
    // }
    // else
    // {
    dbo.collection("doctorcollection").find({name:{$eq:req.body.name}}).toArray((err,result)=>
    
    {
        if(result=="")
        {
            bcrypt.hash(req.body.password,4,(err,hashedpwd)=>{
                if(err)
                {
                    next(err);
                }
                else{

                    let transporter=nodemailer.
                    createTransport({
                        service:"gmail",
                        auth:{
                            user:"gundayamini26@gmail.com",
                            pass:"gsr@kmc16"
                        }
                    });
                    let info= transporter.sendMail({
                        //sender address
                        from:'"login details" <gundayamini26@gmail.com>',
                        //list of recivers
                        to:req.body.email,
                        subject:"Doctor credentials",//subject line
                        text:`username: ${req.body.name},password: ${req.body.password}`,
                    });



                    //replace the plain text with hashed password
                    req.body.password=hashedpwd;
                    dbo.collection("doctorcollection").insertOne(req.body,(err,success)=>{
                        if(err)
                        {
                            console.log('error in patient register')
                        }
                        else{
                            res.json({message:"registration success"})
                        }
                    })
                }
            })
            console.log("Unique Value");

            
        }
        else {
            res.json({"message":"Duplicate Username"})
            console.log("Duplicate Username");
           
        }
    
    })
//}
})

        

//login validation user
userRoutes.post('/login',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb();
        if(req.body.usertype==='patient')
        {

            dbo.collection("patientcollection").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
                if(err){
                   next(err)
                }
                else{
                    if (data.length==0)
                    {
                        res.json({message:'patient name invalid'})
                    }
                
                   else {
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                            if (result==true)
                            {
                                //intailizing varaible
                                currentUserName=data[0].name
                                //create and send JSON token
                                const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "5000"})
                                res.json({message:'patient logged in successfully',userdata:data,token:signedToken})
                            }
                            else{
                                res.json({message:'patient password invalid'})
                            }
                    })
                      
                   }
                }
            })
        }
        else{
            dbo.collection("doctorcollection").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
                if(err){
                   next(err)
                }
                else{
                    if (data.length==0)
                    {
                        res.json({message:'doctor name invalid'})
                    }
                    
                   else {
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                        if (result==true)
                        {
                            //intailizing varaible
                            currentUserName=data[0].name
                            //create and send JSON token
                            const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "5000"})
                            res.json({message:'doctor logged in successfully',userdata:data,token:signedToken})
                        }
                        else{
                            res.json({message:'doctor password invalid'})
                        }
                    })
                      
                   }
                }
            })
        }
        
})

//forgot password//
userRoutes.post('/forgotpwd',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb()
    if(req.body.usertype=="doctor"){
        doc="doctorcollection"
    }
    else{
      doc="patientcollection"
    }
    dbo.collection(doc).find({name:req.body.name}).toArray((err,userArray)=>{
        if(err){
            next(err)
        }
        else{
            if(userArray.length===0){
                res.json({message:"user not found"})
            }
            else{

                jwt.sign({name:userArray[0].name},secret,{expiresIn:3600},(err,token)=>{
                    if(err){
                     next(err);
                    }
                    else{
                        var OTP=Math.floor(Math.random()*99999)+11111;
                        console.log(OTP)
                        
                        client.messages.create({
                            body: OTP,
                            from: '+12054305069', // From a valid Twilio number
                            to: '+919494098906',  // Text this number
  
                        })
                        .then((message) => {
                            dbo.collection('OTPCollection').insertOne({
                                OTP:OTP,
                                name:userArray[0].name,
                                OTPGeneratedTime:new Date().getTime()+15000
                        },(err,success)=>{
                            if(err){
                                next(err)
                            }
                            else{                                        
                                res.json({"message":"user found",
                                    "token":token,
                                    "OTP":OTP,
                                    "name":userArray[0].name
                                })
                            }
                        })
                        });

                    }
                    
                })
            }
        }
    })
})
//verify OTP
userRoutes.post('/otp',(req,res,next)=>{
    console.log(req.body)
    console.log(new Date().getTime())
    var dbo=getdb()
    var currentTime=new Date().getTime()
    dbo.collection('OTPCollection').find({"OTP":req.body.OTP}).toArray((err,OTPArray)=>{
        if(err){
            next(err)
        }
        else if(OTPArray.length===0){
            res.json({"message":"invalidOTP"})
        }
        else if(OTPArray[0].OTPGeneratedTime < req.body.currentTime){
            res.json({"message":"invalidOTP"})
        }
        else{
            
            dbo.collection('OTPCollection').deleteOne({OTP:req.body.OTP},(err,success)=>{
                if(err){
                    next(err);
                }
                else{
                    console.log(OTPArray)
                    res.json({"message":"verifiedOTP"})
                }
            })
        }
    })
})




//changing password
userRoutes.put('/changepwd',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb()
    bcrypt.hash(req.body.password,6,(err,hashedPassword)=>{
        if (err) {
            next(err)
        } else {
            console.log(hashedPassword)
            if(req.body.usertype=="doctor")
            {
                doc="doctorcollection"
            }
            else{
                doc="patientcollection"
            }
            dbo.collection(doc).updateOne({name:req.body.name},{$set:{
                password:hashedPassword
            }},(err,success)=>{
                if(err){
                    next(err)
                }
                else{
                    res.json({"message":"password changed"})
                }
            }) 
        }
    })
    
})





userRoutes.get('/doctors',(req,res)=>{
    dbo=getdb();
    dbo.collection('doctorcollection').find().toArray((err,dataArray)=>{
        if(err){
            console.log('error in saving data')
            console.log(err)
        }
        else{
                    res.json({"message":dataArray})
                    console.log("dataArray:",dataArray);
                }
    })
})
//error handling callback function
userRoutes.use((err,req,res,next)=>{
    console.log(err)
})
module.exports=userRoutes