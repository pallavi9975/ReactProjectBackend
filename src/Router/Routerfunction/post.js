const env = require('dotenv')
const UserRecipeData = require('../../module/recipeData')
const grid = require('gridfs-stream')
const mongoose = require('mongoose');
const { Result } = require('express-validator');


let gfs,gridfsBucket;
const  conn = mongoose.connection;
conn.once('open',()=>{
   gridfsBucket  = new mongoose.mongo.GridFSBucket(conn.db,{
      bucketName:'fs'
   });
   gfs = grid(conn.db,mongoose.mongo);
   gfs.collection('fs')
})

const uploadPhoto = async(req,res)=>{
    try{
        if(!req.file){
         res.send({
           msg:"file not found"
         })
        }
  const imageData = `${'http://localhost:5000'}/post/${req.file.filename}`    
  res.status(200).json({
    imageData
  })
}
catch(error){
 console.log(error)
}
}

const getUploadedPhoto = async(req,res)=>{
    try{
        const file = await gfs.files.findOne({filename : req.params.filename})
        const readStream = gridfsBucket.openDownloadStream(file._id)
        readStream.pipe(res)
       }
       catch(error){
          return res.status(500).json({msg:error.message})
       }
}

const uploadPost = async(req,res)=>{
    try{
            await UserRecipeData.create({
                title:req.body.recipeName,
                aboutRecipe:req.body.aboutRecipe,
                ingridents:req.body.ingridents,
                method:req.body.method,
                img:req.body.image,
                location:req.body.location,
                users:req.body.users
              })
              res.send({
                msg:"data successfuly created"
              })       
      }
      catch(error){
        console.log(error)
      }
}

const getPosts = async(req,res)=>{
    try{
      let Result;
        if(req.params.id){
            Result = await UserRecipeData.find({_id:req.params.id}).populate('users')
            res.json({
              Result
            })

        }
        else{
          Result = await UserRecipeData.find().populate('users')
          res.json({
            Result
          })
        }  
      }
      catch(error){
        console.log(error)
      }
}

const userPost = async(req,res)=>{
  try{
    const Result = await UserRecipeData.find({users:req.params.id}).populate({path:"users",populate:{path:"BookMark.users",model:"UserRecipeData"}})
    res.json({
      Result
    })
  }
  catch(error){
    console.log(error)
  }
}


const getSearchedPost = async(req,res)=>{
  try{
    console.log(req.body)
    const Result = await UserRecipeData.find({ingridents:{$regex:`${req.body.char}`}}).populate("users")
    res.json({
      Result
    })
     }
     catch(error){
      console.log(error)
     }
}




const updatePostsLike = async(req,res)=>{
    try{ 
         await UserRecipeData.findByIdAndUpdate({_id:req.params.id},{
          $push:{likes:req.body}
        },{new:true})
      const Result  = await UserRecipeData.find()
        res.json({
        Result:Result
        })
      }
      catch(error){
        console.log(error)
      }
}

const deletePost = async(req,res)=>{
  try{
    const data = await  UserRecipeData.findOneAndDelete({_id:req.params.id})
     res.json({
      Result:data
     })
  }
  catch(error){
    console.log(error)
  }
}

module.exports={uploadPhoto,getUploadedPhoto,uploadPost,getPosts,updatePostsLike,deletePost,userPost,getSearchedPost}