const cart= require("../model/cart");
const buyer= require("../model/buyer");
const product= require("../model/product");

exports.createCart = async(req,res)=>{
     try{
    
    const {product_id,buyer_id,quantity}= req.body;
    const fetchedProduct = await product.findById(product_id);
    console.log(fetchedProduct);
    if(!fetchedProduct){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        });
    }
    const newCartItem= await cart.create({
   product_id:product_id,
   price:fetchedProduct.price,
   buyer_id: buyer_id,
   quantity:quantity,
    });
    console.log("newCartItem",newCartItem);

    await buyer.findByIdAndUpdate(
        buyer_id,{$push:{
            cart:newCartItem._id,
        }},{new:true},
      );

    return res.status(200).json({
        success:true,
        message:"Product Added Successfully In Cart",
    });
     }

     catch(error){
        console.log("error",error.message);
        return res.status(200).json({
            success:false,
            message:"Unable To Add Product",
        });
     }
  
     

    

}

exports.deleteitem = async(req,res)=>{
   //cart ki id ya product ki id dalni hai use ke cart me 
   try{
    const {productId,buyer_id} = req.body;
     
 const deleteditem = await cart.findByIdAndDelete(productId);
 if(!deleteditem){
    return res.status(400).json({
        success:false,
        message:"Product not found",

    });
}
 await buyer.findByIdAndUpdate(buyer_id,{$pull:{cart:productId}},{new:true});
 
console.log(deleteditem);

return res.status(200).json({
    success:true,
    message:"Product Deleted Successfully From Cart",
});
   }
   catch(error){
    console.log(error.message);
    return res.status(500).json({
        success:false,
        message:"Unable To Delete Product",
    });
   }
    
         }


         

         exports.getAllCartItem =async(req,res)=>{
           try{
            const cartItems =await cart.find({});
           console.log(cartItems);
            return res.status(200).json({
                success:true,
                message:"  Product Fetched Successfully ",
            });
         }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"  Unable to  Fetch Cart Item ",
            });
        }
        }