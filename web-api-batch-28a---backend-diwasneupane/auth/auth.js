const jwt = require("jsonwebtoken");
const customer = require("../models/customerModel")
const staff = require("../models/staffModel")

//this is guard for costumer
module.exports.customerGuard = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "softwarica")
        console.log(data);
        customer.findOne({ _id: data.customerId })
            .then((customer_data) => {
                console.log(customer_data)
                req.CustomerInfo = customer_data;
                next();

            })
            .catch((e) => {
                res.json({ msg: "Invalid Token" });
            })

    } catch (e) {
        res.json({ msg: "Invalid Token" });
    }
}

//this is guard for staff

module.exports.staffGuard = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, "softwarica")
        console.log(data);
        staff.findOne({ _id: data.StaffId })
            .then((staff_data) => {
                req.StaffInfo = staff_data;
                next();
            })
            .catch((e) => {
                res.json({ msg: "Invalid Token" });
            })
    } catch (e) {
        res.json({ msg: "Invalid Token" });
    }
}