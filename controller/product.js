const product = require("../model/product");
const seller = require("../model/seller");
const categ = require("../model/category");
const  cart = require("../model/cart");
 

exports.createProduct= async (req,res)=>{
 try{
const {name,price,description,productImage,category,seller_id} = req.body;
if(!name||!price||!productImage||!category||!seller_id){
    return res.status(500).json({
        success:false,
        message:"All Fields Are Required",
    });
}
 const existingSeller = await seller.findById(seller_id);
 console.log(existingSeller);
 if(!existingSeller){
    return res.status(404).json({
        success:false,
        message:"Seller Not Exist",
    });
 }

 const newProduct = await product.create({
    name:name,
    price:price,
    description:description||"This is a Product ",
    productImage:productImage,
    category:category,
    seller_id: seller_id 
 });
 console.log(newProduct);

  await seller.findByIdAndUpdate(
    {_id:seller_id},{$push:{
        product:newProduct._id,
    }},{new:true},
  );
 await categ.findByIdAndUpdate({_id:category},{$push:{
    products:newProduct._id,
 }},{new:true},);
 
  return res.status(200).json({
    success:true,
    message:"Product Listed Successfully",
});
 }
 catch(error){
    console.log(error.message);
    return res.status(404).json({
        success:false,
        message:"Error in Product Listing ",
    });
 }
}


exports.updateProduct= async (req,res)=>{

  try{
 const {id} = req.params;

 const {name,price,description,productImage,category} = req.body;
if(!name||!price||!productImage||!category){
    return res.status(500).json({
        success:false,
        message:"All Fields Are Required",
    });
}
 

 const updatedProduct= await product.findByIdAndUpdate(id,{ 
    name:name,
    price:price,
    description:description||"This is a Product ",
    productImage:productImage,
    category:category,
} ,{new:true}).populate("category").exec();


console.log("updatesProduct",updatedProduct);
return res.status(200).json({
    success:true,
    message:"  Product Updated Successfully ",
});
  }
  catch(error){
    console.log(error.message);

    return res.status(500).json({
        success:false,
        message:"Error in Product Updation ",
    });
  }

}

exports.getAllProduct = async(req,res)=>{
    try{
 const products = await product.find().populate("category").exec();
console.log(products);
 return res.status(200).json({
    success:true,
    message:"  Product Fetched Successfully ",
});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error in Product Fetching ",
        });
    }
}

exports.deleteProduct= async(req,res)=>{
    try{
 const {id} = req.params;
 const deletedProduct = await product.findByIdAndDelete(id);
 //remove from cart and category 
   const {seller_id}= deletedProduct;
 const updatedSellerProducts= await seller.findByIdAndUpdate(seller_id,{$pull:{
    product:id,
 }},{new:true});


return res.status(200).json({
    success:true,
    message:"  Product Deleted Successfully ",
});


    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error in Product Deletion ",
        });
    }
}


// "name":"apple",
// "price":43,
// "description":"jkdfjhfd",
// "productImage":"jkjk",
// "category":"frir",
// "seller_id":"66609f8018fba3db5ad88320"