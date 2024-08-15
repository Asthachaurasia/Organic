const buyer = require("../model/buyer");
const bcrypt = require("bcrypt");
const seller = require("../model/seller");
const sendMail =require("./mailSenderController"); 
exports.signupBuyer= async(req,res)=>{
    try{
    const {firstName,lastName,password,confirmPassword,email,phoneNo,gender,image,accountType}= req.body;

    if(!firstName||!lastName||!password||!confirmPassword||!email||!phoneNo||!gender){
        return res.status(500).json({
            success:false,
            message:"All fields are required",
        });
    }

  const existingUser = await buyer.findOne({email});
if(existingUser) {
    return res.status(500).json({
   success:false ,
   message:"User Already Exist ",
    });
}

const exsitingPhoneNo = await buyer.findOne({phoneNo});
if(exsitingPhoneNo) {
    return res.status(500).json({
   success:false ,
   message:"Phone no already exist ",
    });
}
    if(password!==confirmPassword){
        return res.status(500).json({
            success:false,
            message:"Password and Confirm Password Should be Same ",
        });
    }
  let hashedPassword;
  try{
    hashedPassword  = await bcrypt.hash(password,10);

  }
  catch(error){
    return res.status(500).json({
        success:false,
        message:"Error in Hashing Password ",
    });
  }
const newUser = await buyer.create({firstName,lastName,password:hashedPassword,email,phoneNo,gender,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,accountType})
console.log("newUser=",newUser);
 

return res.status(200).json({
    success:true,
    message:"SignUp Successfully",

});
}
catch(error){
    console.log(error.message);
    return res.status(500).json({
        success:false,
        message:error.message,
    });
}
}

exports.loginBuyer = async (req,res)=>{
    try{
        const email= req.body.email;
        const password=req.body.password;
        if(!email||!password){
    return res.status(400).json({
        success:false,
        message:"All Fields Are Required",
    })
}

 
const existingUser= await buyer.findOne({email});
console.log(existingUser);
if(!existingUser){
    return res.status(400).json({
        success:false,
        message:"User is not registered",
    })
}
if(await bcrypt.compare(password,existingUser.password)){
    await sendMail(existingUser.email, 'Login Notification', 'You have successfully logged in.');  
    return res.status(200).json({
        success:true,
        message:"Logged in Successfully",
       });
}
else{
    return res.status(500).json({
        success:false,
        message:"Password Is Incorrect",
       });
}
 
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in Login",
           });
    }
}


exports.changePasswordBuyer = async (req,res)=>{
    try{
         
  const {password,changePassword,email} = req.body;
  if(!password||!changePassword||!email){
    return res.status(400).json({
        success:false,
        message:"All Fields Are Required",
       });
  }
const existingUser= await buyer.findOne({email});
if(!existingUser){

    return res.status(404).json({
        success:false,
        message:"Please enter registered E-mail ",
       });
}
if(!await bcrypt.compare(password,existingUser.password)){
    
    return res.status(400).json({
        success:false,
        message:"Incorrect Password ",
       });
}

let hashedPassword;
try{
    hashedPassword= await bcrypt.hash(changePassword,10);
}
catch(error){
    console.log(error.message);
    return res.status(500).json({
        success:false,
        message:"Error In Hashing Password",
       });
}

const newPassword= await buyer.findByIdAndUpdate(existingUser._id,{password:hashedPassword},{new:true});



    await sendMail(existingUser.email, 'Password Change Notification', 'Your password has been successfully changed.');



console.log("newPassword",newPassword)    ;

return res.status(200).json({
    success:true,
    message:"Password changed Successflly",
   });

}
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Error In Changing Password",
           });
    }
}


exports.signupSeller= async(req,res)=>{
    try{
    const {firstName,lastName,password,confirmPassword,email,phoneNo,gender,image,shopName,accountType}= req.body;

    if(!firstName||!lastName||!password||!confirmPassword||!email||!phoneNo||!gender||!shopName||!accountType){
        return res.status(500).json({
            success:false,
            message:"All fields are required",
        });
    }
  
  const existingUser = await seller.findOne({email});
if(existingUser) {
    return res.status(500).json({
   success:false ,
   message:"User Already Exist ",
    });

}
const existingShopName= await seller.findOne({shopName});
if(existingShopName){
    return res.status(500).json({
        success:false ,
        message:"Shop Name Already Exist ",
         });
}
    
if(password!==confirmPassword){
        return res.status(500).json({
            success:false,
            message:"Password and Confirm Password Should be Same ",
        });
    }


  let hashedPassword;
  try{
    hashedPassword  = await bcrypt.hash(password,10);

  }
  catch(error){
    return res.status(500).json({
        success:false,
        message:"Error in Hashing Password ",
    });
  }
const newUser = await seller.create({firstName,lastName,password:hashedPassword,email,phoneNo,gender,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,shopName,accountType})
console.log("newUser=",newUser);

return res.status(200).json({
    success:true,
    message:"SignUp Successfully",
});

}
catch(error){
    console.log("error",error.message);
    return res.status(500).json({
        success:false,
        message:"Error in Signup",
    });
}
}

exports.loginSeller = async (req,res)=>{
    try{
        const email= req.body.email;
        const password=req.body.password;
        if(!email||!password){
    return res.status(400).json({
        success:false,
        message:"All Fields Are Required",
    })
}
const existingUser= await seller.findOne({email});
console.log(existingUser);
if(!existingUser){
    return res.status(400).json({
        success:false,
        message:"User is not registered",
    })
}
if(await bcrypt.compare(password,existingUser.password)){
       return res.status(200).json({
        success:true,
        message:"Logged in Successfully",
       });
}
else{
    return res.status(500).json({
        success:false,
        message:"Password Is Incorrect",
       });
}
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in Login",
           });
    }
}

exports.changePasswordSeller = async (req,res)=>{
    try{
         
  const {password,changePassword,email} = req.body;
  if(!password||!changePassword||!email){
    return res.status(400).json({
        success:false,
        message:"All Fields Are Required",
       });
  }
const existingUser= await seller.findOne({email});
if(!existingUser){

    return res.status(404).json({
        success:false,
        message:"Please enter registered E-mail ",
       });
}
if(!await bcrypt.compare(password,existingUser.password)){
    return res.status(400).json({
        success:false,
        message:"Incorrect Password ",
       });
}

let hashedPassword;
try{
    hashedPassword= await bcrypt.hash(changePassword,10);
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Error In Hashing Password",
       });
}

const newPassword= await seller.findByIdAndUpdate(existingUser._id,{password:hashedPassword},{new:true});

await sendMail(email, 'Password Change Notification', 'Your password has been successfully changed.');

console.log("newPassword",newPassword)    ;

return res.status(200).json({
    success:true,
    message:"Password changed Successflly",
   });

}
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error In Changing Password",
           });
    }
}
