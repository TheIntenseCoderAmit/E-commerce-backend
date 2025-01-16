const mongoose=require('mongoose');
const {Schema} = require("mongoose");
const productSchema=new mongoose.Schema({
    name:String,
    shortDescription:String,
    description:String,
    Price:Number,
    discount:Number,
    images:Array(String),
    categoryId:{type: Schema.Types.ObjectId,ref:'categories'},
    brandId:{type: Schema.Types.ObjectId,ref:'brands'},
    isFeatured:Boolean,
    isNewProducts:Boolean,
});
const Product=mongoose.model('product',productSchema);
module.exports=Product;