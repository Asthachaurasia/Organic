const mongoose= require("mongoose");
const sendMail = require('../controller/mailSenderController');
const buyerSchema = new mongoose.Schema({

firstName:{
    type:String,
    required:true,
    trim:true,
},
lastName:{
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
 
gender:{
    type:String,
    requird:true,
},
image:{
    type:String,

},
// history:[
//     {
//     type:mongoose.Schema.Types.ObjectId,

//     }
// ],

// ratingAndReview:[{
//     type:mongoose.Schema.Types.ObjectId,

// }],

 
cart:[
    {
   type:mongoose.Schema.Types.ObjectId,
   ref:"cart",

    }
],
 

accountType:{
    type:String,
    enum:["Buyer"],
    required:true,
},


 


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

