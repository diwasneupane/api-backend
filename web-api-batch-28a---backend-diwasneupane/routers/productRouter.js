const express = require("express");
const router = new express.Router();
const Product = require("../models/productModel");
const auth = require("../auth/auth");
const upload = require("../fileupload/fileupload");
const { single } = require("../fileupload/fileupload");
const req = require("express/lib/request");

//route to insert product by staff
router.post("/product/insert", auth.staffGuard, upload.single('product_image'), (req, res) => {
    if (req.file==undefined){
        return res.json({msg :"Invalid File Format"})
    }
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_description = req.body.product_description;
    const product_sku = req.body.product_sku;
    const product_quantity = req.body.product_quantity;
    const product_category = req.body.product_category;
    const product_image = req.file.filename;
    const data = new Product({
        product_name: product_name,
        product_price: product_price,
        product_description: product_description,
        product_sku: product_sku,
        product_quantity: product_quantity,
        product_category: product_category,
        product_image: product_image

    })

    data.save()
        .then(() => {
            res.json({ msg: "Prodect added sucessfully" })
        })
        .catch((e) => {
            res.json({ msg: "error" })
        })
})

// router.get('/product',auth.staffGuard, upload.single('product_image'), async (req,res)=>{
router.get('/product', async (req,res)=>{

    const product_details = await Product.find({})
    // console.log(product_deta ils)
    if(!product_details){
        res.status(500).json({
            success:false,
        })
    }else{
        res.status(201).json({
            details: product_details,
            success:true,
        })
    }
    
})
// to show single poduct
router.get('/product/single/:product_id',  (req,res)=>{
    Product.findOne({_id:req.params.product_id})
    .then((data)=>{
        res.json({data:data})
    })
    .catch((e)=>{
    res.json({erro: e})
    })
})

//to update the product section 
router.put("/product/update", auth.staffGuard, upload.single('product_image'), (req, res) => {
    const _id = req.body.product_id;
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_description = req.body.product_description;
    const product_sku = req.body.product_sku;
    const product_quantity = req.body.product_quantity;
    const product_category = req.body.product_category;

    if (req.file == undefined) {
        Product.updateOne({
            _id: _id
        }, {
            product_name: product_name,
            product_price: product_price,
            product_description: product_description,
            product_sku: product_sku,
            product_quantity: product_quantity,
            product_category: product_category,

        })
        .then(() => {
            res.json({ message: "updated sucessfully" })
        })
        .catch((e) => {
            res.json({ message: "invalid" })
        })
    }else{
        Product.updateOne({
            _id: _id
        }, {
            product_name: product_name,
            product_price: product_price,
            product_description: product_description,
            product_sku: product_sku,
            product_quantity: product_quantity,
            product_category: product_category,
            product_image:req.file.filename


        })
        .then(() => {
            res.json({ message: "updated sucessfully" })
        })
        .catch((e) => {
            res.json({ message: "invalid" })
        })
    }



})
router.delete('/product/delete/:product_id',auth.staffGuard,(req,res)=>{
    Product.deleteOne({_id:req.params.product_id})
    .then(()=>{
        res.json({msg:"Product Deleted Sucessfully",success:true})
    })
    .catch((e)=>{
        res.json(e)
    })
})

module.exports = router;