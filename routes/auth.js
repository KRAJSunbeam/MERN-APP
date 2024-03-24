const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt =require('jsonwebtoken')
const { JWT_SECRET } = require('../key')
//const requiredlogin = require('../middleware/requiredlogin')

// router.get('/',(req,res)=>{
//     res.send("hello")
    
// })



router.post('/signup', (req, res) => {
    console.log("Req reached server");
    const { name, email, password } = req.body;
    console.log("Data got dismembered");
    if (!email || !password || !name) {
        console.log("Data checked response send");
        return res.status(422).json({ error: "please add all the fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                console.log("Data checked response send");
                return res.status(422).json({ error: "user already exists with the same email" });
            }
            const user = new User({
                email,
                password,
                name
            });
            user.save()
                .then(user => {
                    console.log("User saved successfully");
                    return res.json({ message: "saved successfully" });
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).json({ error: "Internal server error" });
                });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        });
});


router.post('/sigin',(req,res)=>{
    const{email,password} = req.body
    if(!email|| !password ){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
          return res.status(422).json({error:"invalid email or password"})
        }
         
        if (password === savedUser.password) {
           // return res.json({ message: "Successfully signed in" });
           const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
           const {_id,name,email} = savedUser
            res.json({token,user:{_id,name,email}}) 
        } else {
            return res.status(422).json({ error: "Invalid email or password" });
        }
    } 
      ) .catch(err=>{
        console.log(err)
      })

})

module.exports = router