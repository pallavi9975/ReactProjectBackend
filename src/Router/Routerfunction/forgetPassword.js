
const RegistionData = require('../../module/RegistrationData')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const findrequsers=async(req,res)=>{
  try{
    const Result = await RegistionData.find({username:req.query.username,email:req.query.email})
    if(Result.length>0){
      res.json({
        Result
      }) 
    }
    else{
      res.status(400).json({
        message:"Invalid username or Email"
      })
    }
  }
  catch(error){
    console.log(error)
  }
}

const updteForgettedPassword = async(req,res)=>{
    try{
        if(req.body.Passward===req.body.ConfirmPassward){
           const hashedPassowrd = await bcrypt.hash(req.body.ConfirmPassward, 10)
           console.log(hashedPassowrd)
           const Result = await RegistionData.findOneAndUpdate({username:req.body.username,email:req.body.email},
          {
            password:hashedPassowrd
          }
          )
        res.json({
          Result
        }) 
      }
      else{
        res.status(400).json({
          message:"Please Check Confirm-Password and Password again"
        })
      }
    }
      catch(error){
        console.log(error)
      }
}


module.exports = {updteForgettedPassword,findrequsers}