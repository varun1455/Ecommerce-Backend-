const Product = require("../models/Product");

const router = require("express").Router();

router.post("/", async (req,res)=>{
        const newProduct = new Product(req.body);
        try{

            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);

        }catch(err){
            res.status(500).json(err);
        }
})


router.get("/find/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/", async (req,res)=>{
    const qnew = req.query.new;
    const qcatergory = req.query.category;
    try{
        let products ;
        if(qnew){
            products = await Product.find().sort({createdAt: -1}).limits(1);
        }
        else if(qcatergory){
            products = await Product.find({
                categories:{
                    
                    $in : [qcatergory],
                }
           
            })
        }
        else{
                products = await Product.find();
          }  
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router