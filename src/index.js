const mongoose = require('mongoose')
const app = require('./app')
const http = require('http');

const server  = http.createServer(app);
const url = "mongodb+srv://1234:1234@cluster0.effifom.mongodb.net/RecipiSharingApp?retryWrites=true&w=majority&ssl=true"
mongoose.connect(url).then(()=>{
console.log("connected to mongodb")
}).catch((error)=>{
console.log(error)
})

const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log('server is up')
});