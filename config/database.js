const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DATABASE_URL || "Your mongo url";
const databaseConnect = () => {

  mongoose.connect(url, {
    // removed this option because it has no effect on the outcome and it will be removed in upcoming major version
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Database Connection Successfully");
    })
    .catch((error) => {

      console.log("Error Occurred in Database Connecton ");
      console.error(error.message);

      process.exit(1);
    })
};

module.exports = databaseConnect;
