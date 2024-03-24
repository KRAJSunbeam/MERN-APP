const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require ('./key')
const cors = require('cors')

app.use(cors({
    origin:"http://localhost:3000"
}));

mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo")
})

mongoose.connection.on("error",(err)=>{
    console.log("err conecting")
})


require("./models/user")
require("./models/post")




// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });



app.use(express.json())


app.use(require('./routes/auth'))

app.use(require('./routes/post'))


const custommiddleware =(req,res,next)=>{
    console.log("middleware executed")
    next()
}



app.get('/',(req,res)=>{
    console.log("home")
    res.send("Hello World")
})

app.get('/about',custommiddleware,(req,res)=>{
    console.log("about")
    res.send("about page")
})

app.listen(PORT,()=>{
    console.log("SERVER IS RUNNING ON",PORT);
})

