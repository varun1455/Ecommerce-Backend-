const router = require("express").Router();
const User = require("../models/User")

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");




router.post("/register", async (req,res)=>{


    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        
    });
    try{

        const savenewuser = await newUser.save();
        res.status(201).json(savenewuser);
        console.log(savenewuser);
    }catch(err){
        res.status(500).json(err);
    }

});


router.post("/login", async (req,res)=>{
    try{

        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("wrong credentials");
        const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const password = hashedpassword.toString(CryptoJS.enc.Utf8);
        password !== req.body.password && res.status(401).json("wrong credentials");

        const accesstoken = jwt.sign({
            id:user._id, 
            isAdmin:user.isadmin,
        },
         process.env.JWT_SEC,
         {expiresIn:"5d"}
        )

        res.status(200).json({user, accesstoken});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router