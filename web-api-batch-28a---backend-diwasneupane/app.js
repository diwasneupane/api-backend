const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.static(__dirname+'/photos'))

app.use(cors());

app.use(express.json());
require('./dbConnection/database');


const customerRouter = require('./routers/customerRouter')
app.use(customerRouter)
const staffRouter = require('./routers/staffRouter')
app.use(staffRouter)
const productRouter = require('./routers/productRouter')
app.use(productRouter)
const cartRouter = require('./routers/cartRouter')
app.use(cartRouter)
const orderRouter = require('./routers/orderRouter')
app.use(orderRouter)

app.listen(90)

module.exports = app;