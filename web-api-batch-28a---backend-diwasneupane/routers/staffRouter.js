const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs')
const staff = require("../models/staffModel");
const jwt = require("jsonwebtoken");
const staffGuard = require("../auth/auth");
const upload = require("../fileupload/fileupload");

// register for staff
router.post("/staff/insert", (req, res) => {
    const email = req.body.email;

    staff.findOne({ email: email })
        .then((email_details) => {
            if (email_details != null) {
                return res.json({ msg: "Already Email" });
            }
            const fname = req.body.fname;
            const lname = req.body.lname;
            const password = req.body.password;
            const email = req.body.email;
            const address = req.body.address;
            const phone = req.body.phone;
            const image = req.body.image;


            bcryptjs.hash(password, 10, (e, hashed_pw) => {
                const data = new staff({
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: hashed_pw,
                    address: address,
                    phone: phone,
                    image: image

                })

                data.save()
                    .then(() => {
                        res.json({ msg: "registered" })
                    })
                    .catch((e) => {
                        res.json({ msg: "error" })
                    })
            })
        })
        .catch(() => {

        })
})


// Login
router.post('/staff/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    staff.findOne({ email: email })
        .then((staff_data) => {
            if (staff_data == null) {
                return res.json({ msg: "Invalid Credentials" })
            }
            bcryptjs.compare(password, staff_data.password, (e, result) => {
                    if (result == false) {
                        return res.json({ msg: "Invalid Credentails" })
                    }

                    // Now everything is valid os
                    //it creates the token for the logged in user
                    // the token stores the logged in user id

                    const token = jwt.sign({ StaffId: staff_data._id }, "softwarica");
                    res.json({ token: token })


                }

            )
        })
        .catch((e) => {

        })
        //this is for testing only we will delete this
    router.get("/staff/dashboard", staffGuard.staffGuard, (req, res) => {
        // res.json(req.staffInfo.fname);
        res.json({
            firstname: req.StaffInfo.fname,
            lastname: req.StaffInfo.lname,
            phone: req.StaffInfo.phone,
            email: req.StaffInfo.email

        })
    })
    
})
router.put("/staff/imageupdate", staffGuard.staffGuard, upload.single('staff_image'), (req, res) => {
    if (req.file == undefined) {
        return res.json({ msg: "Invalid file fomat" })
    }
    staff.updateOne({
        _id: req.StaffInfo._id
    }, {
        image: req.file.filename
    })


    .then()
        .catch()
    res.send({ msg: "image uploaded" })

})






module.exports = router;