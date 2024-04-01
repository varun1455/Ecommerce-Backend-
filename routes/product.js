const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

router.post("/",verifyTokenAndAdmin, async (req,res)=>{
        const newProduct = new Product(req.body);
        try{

            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);

        }catch(err){
            res.status(500).json(err);
        }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res)=>{

    
    try{
        const updateProduct = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{new:true})
        res.status(200).json(updateProduct);
    }
    catch(err){
        res.status(500).json(err)
    }
    
})



router.delete("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {

        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted')
        
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/allproducts", async (req, res)=>{
    try {
        const displayitems = await Product.find();

        res.status(200).json(displayitems);
    } catch (error) {
        res.status(500).json(error)
    }
} )


router.get("/find/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
       
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/",verifyTokenAndAdmin, async (req,res)=>{
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
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.status(200).json(products);
        // next();
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router