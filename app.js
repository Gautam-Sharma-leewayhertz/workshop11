const express=require('express');
const app=express();
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const dotenv=require('dotenv')
dotenv.config()



mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('connected',(req,res)=>{
    console.log("connected with db")
})
app.post('/',(req,res)=>{
    res.send("hlo");
})
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use("/user",require('./routes/user.js'))


app.listen(4000,()=>{
    console.log("server is running")
})