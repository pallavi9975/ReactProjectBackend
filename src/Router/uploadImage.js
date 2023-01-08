
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    secrateAcessKey:process.env.ACCESS_SECRATE_KEY,
    accessKeyID:process.env.AKIAWYSUZGBB2PDKUAFC,
    region:process.env.ap-south-1
})

const Bucket = process.env.BUCKET;
const s3 = new aws.s3();

const upload = multer({
    storage:multerS3({
        bucket:Bucket,
        s3:s3,
        acl:"public-read",
        key:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    })
})



