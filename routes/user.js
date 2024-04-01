const User = require('../models/User');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifytoken');

const router = require('express').Router();

router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{

    if(req.body.password){
       req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new:true})
        res.status(200).json(updateUser);
    }
    catch(err){
        res.status(500).json(err)
    }
    
})


router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try {

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// getiing one user who is admin
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {

        const user = await User.findById(req.params.id)
        // const {psw, ...others} = user._doc;

        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
})


//getting all users

router.get("/",verifyTokenAndAdmin, async (req,res)=>{

   
    try {

        const users = await User.find()
     

        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// getting user stats

// router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

//     try {

//         const data = await User.aggregate([
//             {$match : {createdAt: {$gte: lastYear}}},
//             {$project : {$month : "$createdAt"}},
//             {$group : {_id: "$month", total : {$sum:1}}}
//         ])
        
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json(error)
//     }

// })



module.exports = router;
