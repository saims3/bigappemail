var express=require('express');
var router=express.Router();
const mongoose =require('mongoose');
let nodemailer = require('nodemailer');
let cron = require('node-cron');


const User=require('../module/emailuser.js');
 console.log("user details enterd");

 
router.get('/findusers',(req,res,next)=>{
      
       User.find(function(err, users){
        if(err){
            res.json(err);
       }
        else{
            res.json(users);
        }
    });

 });
router.post('/user',(req, res, next)=>{
        console.log("user details enterd");
         let newUserDetails=new User({
             _id: new mongoose.Types.ObjectId(),
           
             EmailAddress:req.body.EmailAddress,
             scheduledtime:req.body.scheduledtime,
     });
    newUserDetails.save((err, user)=>{
                 if(err){
                     res.json(err);
                 }
                 else{
                     res.json({msg:'user added succesfully'});
                 }
        })
});
router.delete('/removers/:id',(req, res, next)=>{
       User.remove({_id: req.params.id},
           function(err,result){
               if(err){
                   res.json(err);
               }
               else{
                   res.json(result);
               }
           
        })
    
    });

router.put('/updatee/:id',(req, res, next)=>{
  //  newid=crypto.AES.decrypt(req.body.log1,secretKey).toString(crypto.enc.Utf8);
        User.findOneAndUpdate({_id:req.body.id},{
    $set:{
           // scheduledtime:req.body.scheduledtime,
           EmailAddress:req.body.EmailAddress
    }
        },
        function(err,result){
            if(err){
                res.json('what happen');
            }
            else{
                res.json(result);
            }
           })
    });




 let transporter = nodemailer.createTransport({
 service: 'gmail',
auth: {
  user: '<username>',
  pass: '<password>'
}
});

cron.schedule('* * * * *', () => {

    
      let currentDate = new Date().toISOString();
    
      User.findOne({scheduled_time:{ $lte: currentDate}}
            ,function(err, results){
          
                  if(err || !results){
                      res.json('not sent err');
                  }
                  else{
            let mailOptions = {
                from:'saikumarms7@gmail.com',
                to: results.EmailAddress,
                subject: 'Email  Message!',
                text: 'Some content to send'
              };
              transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
       
          }
          });



    
});
   
 




module.exports = router ;