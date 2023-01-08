const mongoose = require('mongoose')


const registrationDataNew = new mongoose.Schema({
        name:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        website:{
            type:String,
            default:"",
        },
        Bio:{
           type:String,
           default:"",
        },
        profileimg:{
            type:String,
            default:"",
        },
        followers:[
           {
            users:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"RegistarionDataNew",
            },
            status:false,
            date:String,
            time:String
           }
        ],
        following:[
            {
                users:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"RegistarionDataNew",
                },
                status:false,
                date:String,
                time:String
            }
        ],
        BookMark:[
           {
               users:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"UserRecipeData"
               } 
           }      
        ]   
})



const RegistionDataNew = mongoose.model("RegistarionDataNew",registrationDataNew)

module.exports = RegistionDataNew;

