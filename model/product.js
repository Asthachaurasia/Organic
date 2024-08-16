const mongoose = require("mongoose");
 const productSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,

},
price:{
    type:Number,
    required:true,
    trim:true,

},
description:{
    type:String,
    
    trim:true,
},
productImage:{
    type:String,
    required:true,
},

// category:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"category",
//     required:true,
// },
// seller_id:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"seller",
//     required:true,
// }
// buyer:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"buyer",
//  }],

 });

  
 module.exports= mongoose.model("product",productSchema);