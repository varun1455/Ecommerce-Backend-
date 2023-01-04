const router = require("express").Router();

const Cart = require("../models/Cart");

router.post("/", async (req,res)=>{
    const newCart = new Cart(req.body);
    try{

        const savedCart = await newCart.save();
        res.status(200).json(savedCart);

    }catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("order has been deleted.")
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/find/:id", async (req,res)=>{
    try{
        const cart = await Cart.findOne(req.params.id);
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/", async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})





module.exports = router;