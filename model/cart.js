const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product_id:
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:"product",
             required:true,
        }

    ,
    price:{
        type:String,
        
    },
    buyer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"buyer",
    },

    quantity:{
        type:Number,
        required:true,
    },
});

module.exports= mongoose.model("cart",cartSchema);