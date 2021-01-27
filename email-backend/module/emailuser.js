const mongoose =require('mongoose');

var Schema = mongoose.Schema;


const DialogUserSchema=new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
         
    
   
    
    EmailAddress:{
        type:String,
        required:true
    },
    
    scheduledtime: {
        type: Date,
       // default: Date.now
       required:true
    },
    
});


const User=mongoose.model('User',DialogUserSchema);
module.exports=User;
