const Conversation = require('../../module/ConversationSchema');


const CreateConversationRoom = async(req,res)=>{
    try{
        const senderID = req.body[0]
        const reviserID = req.body[1]  
        const exists = await Conversation.findOne({usersid:{$all:[senderID,reviserID]}})
        if(!exists){
           const Result = await Conversation.create({usersid:req.body})
           res.json({
            Result : Result,
            message:"room successfully created"
           })
        }
        else{
          res.json({
            message:"user alrady exists"
          })
        }
       }
       catch(error){
        console.log(error)
       }
}




const getCreateConversationRoom = async(req,res)=>{
    try{
        const senderID = req.params.senderID;
        const reviserID = req.params.reviserID
        const Result = await Conversation.findOne({usersid:{$all:[senderID,reviserID]}})
         res.json({
           Result:Result
         })
       }
       catch(error){
        console.log(error)
       }
}

const addChats = async(req,res)=>{
    try{
        const senderID = req.params.senderID;
        const reviserID = req.params.reviserID
         
        const Result = await Conversation.findOneAndUpdate({usersid:{$all:[senderID,reviserID]}},{
           $push:{chats:req.body}
        })
           res.json({
             message:"data successfully updated",
             Result : Result
           })
       }
       catch(error){
        console.log(error)
       }
}


module.exports = {CreateConversationRoom,getCreateConversationRoom,addChats}