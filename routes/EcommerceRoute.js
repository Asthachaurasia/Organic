const express= require("express");

const router= express.Router();
const  {signupBuyer,loginBuyer,signupSeller,loginSeller,changePasswordSeller,changePasswordBuyer}= require("../controller/Authentication");

const {createCart,deleteitem,getAllCartItem}= require("../controller/cart");
//const {createCategory}= require("../controller/category");
const {createProduct,updateProduct,getAllProduct,deleteProduct}= require("../controller/product");

 router.post("/buyerlogin",loginBuyer);
 router.post("/buyersignup",signupBuyer);
//  router.post("/sellersignup",signupSeller);
//  router.post("/sellerlogin",loginSeller);
//  router.put("/changePasswordSeller/:id",changePasswordSeller);
 router.put("/changePasswordBuyer/:id",changePasswordBuyer);



//  router.post("/createCategory",createCategory);

 router.post("/createCart",createCart);
 router.get("/getAllCartItem",getAllCartItem);
 router.delete("/deleteitem",deleteitem);


 router.post("/createProduct",createProduct);
 router.get("/getAllProduct",getAllProduct);
 router.delete("/deleteProduct/:id",deleteProduct);
 router.put("/updateProduct/:id",updateProduct);


module.exports= router;


