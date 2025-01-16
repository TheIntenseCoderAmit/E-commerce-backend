const mongoose=require('mongoose');
const {Schema} = require("mongoose");
const orderSchema=new mongoose.Schema({

    userId:{type:Schema.Types.ObjectId,ref:"users"},
    date:Date,
    items:Array(mongoose.Schema.Types.Mixed),
    paymentType:String,
    address:mongoose.Schema.Types.Mixed,
    status:String,

});
const Order=mongoose.model('Order',orderSchema);
module.exports=Order;