const product = require("../model/product");
const  cart = require("../model/cart");
 

exports.createProduct= async (req,res)=>{
 try{
const {name,price,description,productImage} = req.body;
if(!name||!price||!productImage){
    return res.status(500).json({
        success:false,
        message:"All Fields Are Required",
    });
}
 

 const newProduct = await product.create({
    name:name,
    price:price,
    description:description||"This is a Product ",
    productImage:productImage,
    
 });
 console.log(newProduct);


 
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

 const {name,price,description,productImage} = req.body;
if(!name||!price||!productImage){
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
    
} ,{new:true});


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