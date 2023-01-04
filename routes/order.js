const router = require("express").Router();

const Order = require("../models/Order");

router.post("/", async (req,res)=>{
    const newOrder = new Order(req.body);
    try{

        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);

    }catch(err){
        res.status(500).json(err);
    }
})


router.delete("/:id", async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("order has been deleted.")
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/find/:id", async (req,res)=>{
    try{
        const Order = await Order.find(req.params.id);
        res.status(200).json(Order);
    }catch(err){
        res.status(500).json(err);
    }
})



router.get("/", async (req,res)=>{
    try{
        const Orders = await Order.find();
        res.status(200).json(Orders);
    }catch(err){
        res.status(500).json(err);
    }
})





module.exports = router