const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requiredlogin = require('../middleware/requiredlogin')
const Post = mongoose.model("Post")



// router.get('/protected',requiredlogin,(req,res)=>{
//     res.send("hello user")
// })




router.get("/allpost",requiredlogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")     // expand the record                
    .then(posts=> 
        {res.json({posts})
})
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',requiredlogin,(req,res)=>{
    const{title,body,url}= req.body
    if(!title || !body|| !url){
        res.status(422).json({error:"Please add all the fields"})
    }
    req.user.password= undefined
    const post = new Post({
        title,
        body,
       photo:url,
        postedBy:req.user
    })
    post.save().then(result=>{
         res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requiredlogin,(req,res)=>{
    console.log("Sucess")
    console.log({postedBy:req.user._id});
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>res.json({mypost}),
    console.log({mypost}),
     console.log("response sent"),
    
    )
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router