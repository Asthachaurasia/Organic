const express= require("express");

const router= express.Router();
const  {signupBuyer,loginBuyer,signupSeller,loginSeller,changePasswordSeller,changePasswordBuyer}= require("../controller/Authentication");

const {createCart,deleteitem,getAllCartItem}= require("../controller/cart");
const {createCategory}= require("../controller/category");
const {createProduct,updateProduct,getAllProduct,deleteProduct}= require("../controller/product");

 router.post("/buyerlogin%0A",loginBuyer);
 router.post("/buyersignup%0A",signupBuyer);
//  router.post("/sellersignup",signupSeller);
//  router.post("/sellerlogin",loginSeller);
//  router.put("/changePasswordSeller/:id",changePasswordSeller);
 router.put("/changePasswordBuyer/:id%0A",changePasswordBuyer);



//  router.post("/createCategory",createCategory);

 router.post("/createCart%0A",createCart);
 router.get("/getAllCartItem%0A",getAllCartItem);
 router.delete("/deleteitem%0A",deleteitem);


 router.post("/createProduct%0A",createProduct);
 router.get("/getAllProduct",getAllProduct);
 router.delete("/deleteProduct/:id",deleteProduct);
 router.put("/updateProduct/:id",updateProduct);


module.exports= router;


