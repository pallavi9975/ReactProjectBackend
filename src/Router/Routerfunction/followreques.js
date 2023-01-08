const { default: mongoose, trusted } = require('mongoose')
const RegistionDataNew = require('../../module/RegistrationData')

const followReq = async(req,res)=>{
      try{
        console.log(req.body)
      const Result = await RegistionDataNew.findByIdAndUpdate({_id:req.params.id},{
        $push:{followers:req.body}
      },{new:true})
       res.json({
        Result:Result
       })
      }
      catch(error){
        console.log(error)
      }
}


const following = async(req,res)=>{
  try{
    console.log(req.body)
  const Result = await RegistionDataNew.findByIdAndUpdate({_id:req.params.id},{
    $push:{following:req.body}
  })
   res.json({
    Result:Result
   })
  }
  catch(error){
    console.log(error)
  }
}



const unfollowReq = async(req,res)=>{
  try{
    console.log(req.body)
    const Result = await RegistionDataNew.findByIdAndUpdate({_id:req.params.id},{
    $pull:{followers:{users:req.body.users}}
  },{new:true})
    res.json({
     Result:Result
    })
  }
  catch(error){
    console.log(req.body)
    console.log(error)
  }
}

const unfollowing = async(req,res)=>{
  try{
    console.log(req.body)
  const Result = await RegistionDataNew.findByIdAndUpdate({_id:req.params.id},{
    $pull:{following:{users:req.body.users}}
  })
    res.json({
     Result:Result
    })
  }
  catch(error){
    console.log(req.body)
    console.log(error)
  }
}




 module.exports = {followReq,following,unfollowReq,unfollowing}