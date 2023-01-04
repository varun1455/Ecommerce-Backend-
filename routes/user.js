// const { verify } = require("jsonwebtoken");

// const { verifyToken } = require("./verifytoken");
// const User = require("../models/User")

// const router = require("express").Router();

// router.put("/.id", verifyToken, async (req,res)=>{
//     if(req.body.password){
//         req.body.password = CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.PASS_SEC
//         ).toString();
//     }

    // try{
    //     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    //         $set : req.body
    //     },{new: true})
    //     res.status(200).json(updatedUser);
    // }catch(err){
    //     res.status(500).json(err);
    // }
// })


// router.get("./id", verifyTokenandAdmin, async (req, res)=>{
//     try{
//         const user = await User.findById(req.params.id);
//         const {password} = user._doc;
//         res.status(200).json({o})
//     }
// })


// module.exports = router
