const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
// const port = process.env.PORT || 3000;
const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const productRoute = require("./routes/product");
const customerRoute = require("./routes/customer");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const cors = require("cors");
const {verifyToken, isAdmin} = require("./middleware/auth-middleware");
 require('dotenv').config();



app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send('server is running');
});
app.use("/category", verifyToken, isAdmin, categoryRoute);
app.use("/brand", verifyToken, isAdmin, brandRoute);
app.use("/orders", verifyToken, isAdmin, orderRoute);
app.use("/product", verifyToken, isAdmin, productRoute);
app.use("/customer", verifyToken, customerRoute)
app.use("/auth", authRoute);


async function connectDB() {
    await mongoose.connect(`mongodb+srv://AmitKumar05:${process.env.MONGO_PASSWORD}@e-commerce.tarnabc.mongodb.net/?retryWrites=true&w=majority&appName=E-commerce` , {
        dbName: "E-commerce-db",
    });
    console.log("MongoDB Connected");


}

connectDB().catch((err) => {
    console.error(err);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

