const mongoose=require('mongoose')

const imageSchema=new mongoose.Schema({
    filename:String,
    destinataion:String,
    size:Number,
    path:String,
    mimetype:String,

});

module.exports=mongoose.model('imageCollection',imageSchema)