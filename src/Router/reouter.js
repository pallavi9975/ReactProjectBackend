const express = require('express')
const Router = express.Router();
const upload = require('../upload')
const { body} = require('express-validator')

const { login, Registation, patchUserData, getUpdatedData, getAllUsers,bookMarkPost } = require('./Routerfunction/RegistationAndLogin');
const { uploadPost, getUploadedPhoto, uploadPhoto, getPosts, updatePostsLike, deletePost,userPost,getSearchedPost } = require('./Routerfunction/post');
const { updteForgettedPassword, findrequsers } = require('./Routerfunction/forgetPassword');
const { CreateConversationRoom, getCreateConversationRoom, addChats } = require('./Routerfunction/Conversation');
const {followReq,following,unfollowing,unfollowReq} = require('./Routerfunction/followreques')

console.log(getSearchedPost)


Router.post('/login',login)

Router.post('/Register',body('name').isAlpha(),body('username').isAlphanumeric(),body('email').isEmail(),body('password').isLength({min:8}),Registation)

  
  Router.post('/post',upload.single('userpic'),uploadPhoto)
    
  Router.get('/post/:filename',getUploadedPhoto)

  Router.post('/userData',uploadPost)

  Router.get('/getAllPost',getPosts)

  Router.get('/userPost/:id',getPosts)

  Router.get("/getPost/:id",userPost)
  
  Router.delete('/userPost/:id',deletePost)

Router.patch('/updateddata/:id',patchUserData)

Router.get('/updateddata/:id',getUpdatedData)

Router.patch("/updateddata/addlike/:id",updatePostsLike)

Router.post('/forgetPassward',findrequsers)

Router.patch('/forgetPassward',updteForgettedPassword)

Router.post("/getAllUsers",getAllUsers)

 Router.post("/conversation",CreateConversationRoom)
 
 Router.get("/conversation/:senderID/:reviserID",getCreateConversationRoom)

Router.patch("/conversation/:senderID/:reviserID",addChats)

Router.patch("/updatedata/followRequest/:id",followReq)

Router.patch("/updatedata/followingRequest/:id",following)

Router.patch("/updatedata/unfollowRequest/:id",unfollowReq)

Router.patch("/updatedata/unfollowingRequest/:id",unfollowing)

Router.patch("/updatedata/bookmarkpost/:id",bookMarkPost)

Router.post("/getSearchedValue",getSearchedPost)


 module.exports = Router;


