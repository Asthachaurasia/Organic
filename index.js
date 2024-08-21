const express = require("express");
const databaseConnect = require("./config/database");
const path = require("path");
const cors = require('cors');
const app = express();

app.use(cors());



require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

const ecommerce = require("./routes/EcommerceRoute");
app.use("/api/v1", ecommerce);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("This Route Is Not Defined");
})

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
  databaseConnect();

})

