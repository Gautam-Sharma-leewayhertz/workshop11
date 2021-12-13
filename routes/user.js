const router=require('express').Router()
const upload=require('../utils/multer')
const Image=require('../model/image')
const fs = require('fs')
const path=require('path')

const express=require('express');
const app=express();
const bodyparser=require("body-parser")

router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())

router.put('/',upload.single('image'),async (req,res)=>{
   //res.send(req.file)
    const image=new Image({
        filename:req.file.filename,
        mimetype:req.file.mimetype,
        size:req.file.size,
    })
    const result=await image.save()
    res.send(result);
})

router.get('/',async (req,res)=>{
    try {
        const allimage=await Image.find({})
        res.json(allimage)
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:id",async(req,res)=>{
    try {
       const deleteimage=await Image.findById(req.params.id)
    
       fs.unlink(deleteimage.path,(err)=>{
           if(err) return console.log(err);
           else return console.log("success")
       })
       
       await deleteimage.remove();
       res.send(deleteimage); 
    } catch (error) {
        console.log(error)
    }
})

router.post("/:id",async (req,res)=>{
    try{
        const user=await Image.findById(req.params.id);
        const oldpath='./upload/'+user.filename
        const newpath='./upload/'+rename+s
        const s='.jpg';
        //const rename='sli';
        fs.rename(oldpath,newpath,(err)=>{
            if(err) return console.log(err);
            else return console.log('sucess')
        })

        const data={
            filename:rename+s,
            mimetype:user.mimetype,
            size:user.size,
        } 
            
         console.log(data)
         res.send(data)
         user=await Image.findByIdAndUpdate(req.params.id,data,{
             new:true
         })
        // res.send("successfully renamed");

    }catch(err){
        res.send(err);
    }
})



module.exports=router