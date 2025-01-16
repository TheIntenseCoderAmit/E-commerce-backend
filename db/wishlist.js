const mongoose=require('mongoose');
const {Schema} = require("mongoose");
const wishlistSchema=new mongoose.Schema({
    userId:{type:Schema.Types.ObjectId,ref:"users"},
    productId:{type:Schema.Types.ObjectId,ref:'product'},


});
const Wishlist=mongoose.model('wishlist',wishlistSchema);
module.exports=Wishlist;