const mongoose = require('mongoose')

const userRecipeData = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    aboutRecipe: {
        type: String,
        required: true
    },
    ingridents: {
        type: Array
    },
    method: {
        type: Array
    },
    img: {
        type: String,
    },
    likes: {
        type: Array
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegistarionDataNew"
    }
})


const UserRecipeData = mongoose.model('UserRecipeData', userRecipeData)

module.exports = UserRecipeData;