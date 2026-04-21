const express = require('express');
const dns = require('dns'); // 1. Add this
dns.setDefaultResultOrder('ipv4first'); // 2. Add this
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDb = require('./config/connectDb');
const path=require('path');
//config dotenv
dotenv.config();
//connectDB
connectDb();
//rest object
const app = express();


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use('/api/v1/users', require('./routes/userRoute'));
//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));
//insights routes
app.use("/api/insights", require("./routes/insights"));

//static files
app.use(express.static(path.join(__dirname, "./client/dist") ));
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,"client/dist/index.html"));
});
//PORT
const PORT = process.env.PORT || 8080;
console.log("USING MONGO URL =>", process.env.MONGO_URL);

//listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
