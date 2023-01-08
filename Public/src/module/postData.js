const mongoose = require('mongoose')

const userPostData = mongoose.Schema({
        username:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        img:{
            type:String,
        },
        location:{
            type:String,
        },
        likes:{
            type:Array
        },
        users:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RegistarionDataNew"
        }
})


const UserPostData = mongoose.model('UserPostData',userPostData)

module.exports = UserPostData;