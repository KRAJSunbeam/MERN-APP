const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require(`../key`)
const mongoose = require('mongoose')
const User= mongoose.model("User")
module.exports= (req,resp,next)=>
{
    //authorization === Bearer befkbjknbfo
    const{authorization}= req.headers
    console.log(authorization)
    if(!authorization){
        console.log("error always")
      return resp.status(401).json({error:"you must have account"})
    }

   const token = authorization.replace("Bearer ","")
   jwt.verify(token,JWT_SECRET,
    (error,payload)=>{
    if(error){
        return resp.status(401).json({error:"you must be logged in"})
    }
    const {_id} = payload
    User.findById(_id)
    .then(userdata => {
        req.user =userdata
        next()
    })
   })
  
}