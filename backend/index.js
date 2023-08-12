const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const {connectDB} = require("./connection");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobTypeRoutes");
const jobRoute = require("./routes/jobRoutes");



connectDB("mongodb://127.0.0.1:27017/Portal")
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log(err);
    })

// Middlewares
app.use(morgan('dev'));
app.use(bodyparser.json({limit:"5mb"}));
app.use(bodyparser.urlencoded({limit:"5mb",extended:true}));
app.use(cookieParser());
app.use(cors());


app.use('/api',authRoute);
app.use('/api',userRoute);
app.use('/api',jobTypeRoute);
app.use('/api',jobRoute);






const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Server Running");
})