const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require('cors')

const corsOptions = {
    origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
    methods: ['GET','POST'],
  };
app.use((cors(corsOptions)))
const userRoute = require('./routes/user')


const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

dotenv.config();


mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_URL
).then(()=>

    console.log("database connect successfully")).catch((err)=>{
        console.log(err);
    })

 

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)



app.listen(5000, ()=>{
    console.log("server is running");
})

