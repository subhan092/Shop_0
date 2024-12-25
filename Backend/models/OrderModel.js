const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart:{
        type: Array,
        required: true,
    },
    // shippingAddress:{
    //     type: Object,
    //     required: true,
    // },
    user:{
        type: Object,
        required: true,
    },
    seller:{
        type: Object,
        required: true,
    },
    // totalPrice:{
    //     type: Number,
    //     required: true,
    // },
    status:{
        type: String,
        default: "Processing",
    },
    paidAt:{
        type: Date,
        default: Date.now(),
    },
    deliveredAt: {
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

 const OrderModel = mongoose.model("Order", orderSchema);
 module.exports =  OrderModel
