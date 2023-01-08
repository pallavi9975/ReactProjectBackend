const mongoose = require("mongoose")

const conversation =  mongoose.Schema({
    chats:{
        type:Array
    },
    usersid:{
        type:Array
    }
})


const Conversation = mongoose.model("Conversation",conversation)
module.exports = Conversation;


