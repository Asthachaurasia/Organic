const express = require("express");

const app= express();
require("dotenv").config();
const PORT =process.env.PORT||3000;
app.use(express.json());

const ecommerce=require("./routes/E-commerceRoute");
app.use("/api/v1",ecommerce);

const databaseConnect = require("./config/database");
databaseConnect();

app.listen(PORT,()=>{
    console.log(`Server Started ${PORT}`);

})

app.get("/",(req,res)=>{
    res.send("This Route Is Not Defined");
})
