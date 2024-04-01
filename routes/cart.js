const router = require("express").Router();

const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

router.post("/",verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body);
    try{

        const savedCart = await newCart.save();
        res.status(200).json(savedCart);

    }catch(err){
        res.status(500).json(err);
    }
})

router.put('/:id/:ProductId', verifyTokenAndAuthorization, async (req, res)=>{

   

    try{
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new:true})
        res.status(200).json(updateCart);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
    
})


//working for admin
router.delete("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("cart product has been deleted.")
    }catch(err){
        res.status(500).json(err);
    }
})


// working for admin and user both
router.get("/find/:UserID",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cart = await Cart.findOne({userID:req.params.UserID});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})


//working for admin

router.get("/",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})





module.exports = router;