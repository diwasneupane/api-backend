const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs')
const customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const customerGuard = require("../auth/auth");
const auth = require("../auth/auth");
const req = require('express/lib/request');
const res = require('express/lib/response');
const upload = require("../fileupload/fileupload");
const { route } = require('express/lib/application');



router.post("/customer/insert", (req,res)=> {
    console.log(req.body)
        const email = req.body.email;
        customer.findOne({email : email})
        .then((email_details)=>{
            if(email_details!=null){
                res.json({msg: "Email already exists"});
                return;
            }
    
        const fname = req.body.fname;
        const lname = req.body.lname;
        const username = req.body.username;
        const email= req.body.email;
        const age = req.body.age;
        
        const phone = req.body.phone;
        const password = req.body.password;
        const address = req.body.address;
        const gender= req.body.gender;
    
        bcryptjs.hash(password, 10, (e, hashed_pw)=>{
            const data = new customer({
                fname : fname,
                lname : lname,
                username : username,
                email : email,
                age : age,
                
                phone : phone,
                password : hashed_pw,
                address : address,
                gender:gender
            })
        
            data.save()
            .then(()=>{
                res.json({msg: "user inserted"})
            })
            .catch((e)=>{
                res.json({msg: "user insertion failed"})
            });
        })
    
        
            
            
        })
        .catch()
    
        
    
    })


// Login
// router.post('/customer/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     customer.findOne({ email: email })
//         .then((customer_data) => {
//             console.log(customer_data)
//             if (customer_data == null) {
//                 return res.json({ msg: "Invalid Credentialswwwwww" })
//             }
//             bcryptjs.compare(password, customer_data.password, (e, result) => {
//                     if (result == false) {
//                         return res.json({ msg: "Invalid Credentailseeeee" })
//                     }

//                     // Now everything is valid os
//                     //it creates the token for the logged in user
//                     // the token stores the logged in user id

//                     const token = jwt.sign({ customerId: customer_data._id }, "softwarica");
//                     res.json({msg:"Login successful", token: token })
                    
                    


//                 }

//             )
//         })
//         .catch((e) => {

//         })
//         //this is for testing only we will delete this


//     // })
//     // router.delete('/comment/delete', customerGuard.customerGuard, (req, res) => {
//     //     res.json({ message: "deleted" })
// })

router.post("/customer/login",(req,res)=>{
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    customer.findOne({email:email})
    .then((cust_data)=>{
        console.log(cust_data)
        if(cust_data==null){
            res.json({msg:"Invalid Credentials"})
            return;
        }
        bcryptjs.compare(password, cust_data.password, (e, result)=>{

            if(result == false){
                res.json({msg:"Invalid Credentials"})
                return;
            }
            // Now everything is Valid....

            // it creates the token for the logged in user
            // the token stores the logged in user id
            const token = jwt.sign({customerId : cust_data._id}, "softwarica");
            res.send({token : token});
            

        })
    })
    .catch()

})
//this is dashboard route for customer 
router.get("/customer/dashboard", customerGuard.customerGuard, (req, res) => {
    // res.json(req.CustomerInfo.fname);
    res.json({
        firstname: req.CustomerInfo.fname,
        lastname: req.CustomerInfo.lname,
        username: req.CustomerInfo.username,
        email: req.CustomerInfo.email,
        age: req.CustomerInfo.age,
        address: req.CustomerInfo.address,
        gender: req.CustomerInfo.gender,
        phone: req.CustomerInfo.phone,
        image: req.CustomerInfo.image,
 
    })
})


    
    






router.get("/customer", auth.staffGuard, async (req, res) => {
    // res.json(req.CustomerInfo.fname);
    const user_details = await customer.find({})
    // console.log(product_deta ils)
    if(!user_details){
        res.status(500).json({
            success:false,
        })
    }else{
        res.status(201).json({
            details: user_details,
            success:true,
        })
    }
    
})


//this is dashboard update route
router.put("/customer/update", customerGuard.customerGuard,upload.single('image'), (req, res) => {
    const id = req.CustomerInfo._id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const phone = req.body.phone;
    const address = req.body.address;
   
    const password = req.body.password;
    const email = req.body.email;
    if (req.file == undefined) {
        customer.updateOne({
            _id: id
        }, {
            fname: fname,
            lname: lname,
            phone: phone,
            username:username,
            address:address,
           
            password:password,
            email:email,

        })
        .then(() => {
            res.json({ message: "updated sucessfully" })
        })
        .catch((e) => {
            res.json({ message: "invalid" })
        })
    }else{
    customer.updateOne({
            _id: id
        }, {
            fname: fname,
            lname: lname,
            phone: phone,
            username:username,
            address:address,
           
            password:password,
            email:email,
            image:req.file.filename
        })
        .then(() => {
            res.json({ message: "updated sucessfully" })
        })
        .catch((e) => {
            res.json({ message: "invalid" })
        })
    }
})
router.delete('/customer/delete/:_id',auth.staffGuard,(req,res)=>{
    customer.deleteOne({_id:req.params._id})
    .then(()=>{
        res.json({msg:"User Deleted Sucessfully",success:true})
    })
    .catch((e)=>{
        res.json(e)
    })
})





module.exports = router;