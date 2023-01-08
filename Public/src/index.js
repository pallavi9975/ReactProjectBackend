const mongoose = require('mongoose')
const app = require('./app')
const {Server} = require('socket.io')
const http = require('http');
const { captureRejectionSymbol } = require('events');


const server  = http.createServer(app);
const url = "mongodb+srv://1234:1234@cluster0.effifom.mongodb.net/myinsta?retryWrites=true&w=majority&ssl=true"
mongoose.connect(url).then(()=>{
console.log("connected to mongodb")
}).catch((error)=>{
console.log(error)
})

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"]
    }
});
 
io.sockets.on('connection',async(socket)=>{  
    
     socket.on('joinRoom',(room)=>{
       socket.join(room)
       
    })

     socket.on("message",(data,error)=>{
        if(!error){
            console.log(data.userid)
            io.in(data.userid).emit('sendmessage',data)
        }
    })

 }) 

const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log('server is up')
});