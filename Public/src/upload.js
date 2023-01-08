const multer = require('multer')

const {GridFsStorage} = require('multer-gridfs-storage')

const storage = new GridFsStorage({
 url : "mongodb+srv://1234:1234@cluster0.effifom.mongodb.net/myinsta?retryWrites=true&w=majority",
 file : (req,file) =>{

   const match = ['image/png','image/jpg']
    if(match.indexOf(file.memeType)==-1){
        return `${Date.now()}-insta-${file.originalname}`;
    }
    return{
          bucketName : "photo",
          fileName : `${Date.now()}-insta-${file.originalname}`
    }
 }

})

const upload = multer({storage})

module.exports = upload;