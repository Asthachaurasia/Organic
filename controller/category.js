const category = require("../model/category");

exports.createCategory= async(req,res)=>{
    try{
        const {name,description } =  req.body;

        if(!name||!description){
          return res.status(400).json({
              success:false,
              message:"All fields are required ",
               });
        }
      
        const categorydetail = await category.create({
          name:name,
          description:description,
      
        });
        console.log(categorydetail);
      
        return res.status(200).json({
          success:true,
          message:"Category Created Successfully ",
           });
          }
          catch(error){
       return res.status(500).json({
      success:false,
      message:"Error in Category creation ",
       });
    }
     
    
};