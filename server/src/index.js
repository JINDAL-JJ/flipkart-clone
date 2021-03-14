const express = require("express");
const env = require("dotenv");
const { json } = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//used to use constants mentioned in .env file
env.config();

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");

//middleware to let other servers access this server as api, i.e, cors package
app.use(cors());
//middleware used to post req.body to server
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const CONNECTION_URL = "mongodb://localhost/ECOMMERCE";

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(console.log("database connected"))
    .catch((error) => console.log(error));

app.use("/api/admin", adminRoutes);
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api", authRoutes);
app.use("/api", initialDataRoutes);
app.use("/api/user/cart", cartRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
