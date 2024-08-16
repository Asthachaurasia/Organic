const mongoose= require("mongoose");
const sendMail = require('../controller/mailSenderController');
const buyerSchema = new mongoose.Schema({

Name:{
    type:String,
    required:true,
    trim:true,
},
 
phoneNo:{
    type:String,
    required:true,
    
},
email:{
    type:String,
    required:true,
},


password:{
    type:String,
    required:true,
},
 
 
image:{
    type:String,

},
 
 
cart:[
    {
   type:mongoose.Schema.Types.ObjectId,
   ref:"cart",

    }
],
 

 

 


});


buyerSchema.post('save', async function (doc, next) {
    try {
        await sendMail(doc.email, 'SignUp Mail', 'User registered Successfully');
        next();
    } catch (error) {
        console.error('Error sending email:', error.message);
        next(error);
    }
});

module.exports= mongoose.model("buyer",buyerSchema);

