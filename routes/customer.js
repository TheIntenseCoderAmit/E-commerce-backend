const express = require('express');
const {getCategories} = require("../handlers/category-handler");
const {getBrands} = require("../handlers/brand-handler");
const {getNewProduct, getFeaturedProduct, getProductForListing, getProductById,} = require("../handlers/product-handler");

const {getWishlist, addToWishlist, removeFromWishlist} = require("../handlers/whislist-handler");
const {getCart, addToCart, removeFromCart, clearCart} = require("../handlers/shoping-cart-handler");
const {addOrder, getCustomerOrders} = require("../handlers/order-handler");

const router = express.Router();

router.get('/new-products', async (req, res) => {
    const products = await getNewProduct();
    res.send(products);
});

router.get('/featured-product', async (req, res) => {
    const products = await getFeaturedProduct();
    res.send(products);
})

router.get('/categories', async (req, res) => {
    const categories = await getCategories();
    res.send(categories);
});
router.get('/brands', async (req, res) => {
    const brands = await getBrands();
    res.send(brands);
});

router.get('/products', async (req, res) => {
    const {searchTerm, categoryId, sortBy, sortOrder,brandId,pageSize,page} = req.query;
    const products = await getProductForListing(searchTerm, categoryId,page,pageSize, sortBy, sortOrder,brandId,pageSize);
    res.send(products);
});

router.get('/product/:id', async (req, res) => {
    const id=req.params['id'];
    const product = await getProductById(id);
    res.send(product);
})

router.get('/wishlist',async (req,res)=>{
    const userId=req.user.id;
    const items= await getWishlist(userId);
    res.send(items);
})
router.post('/wishlist/:id',async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    const item= await addToWishlist(userId,productId);
    res.send(item);
})

router.delete('/wishlist/:id',async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    await removeFromWishlist(userId,productId);
    res.send( {message:'Product removed from Wishlist...'});
})

router.get('/cart',async (req,res)=>{

    const userId=req.user.id;
    const items= await getCart(userId);
    res.send(items);
})


router.post('/cart/:id',async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    const quantity=req.body.quantity;
    const item= await addToCart(userId,productId,quantity);
    res.send(item);

})

router.delete('/cart/:id',async (req,res)=>{
    const userId=req.user.id;
    const productId=req.params.id;
    const item= await removeFromCart(userId,productId);
    res.send(item);
})

router.post('/order',async (req,res)=>{
    const userId=req.user.id;
    const order=req.body;
    await addOrder(userId,order);
    await clearCart(userId);
    return res.send({ message:  "Order Created",})
});

router.get('/orders',async (req,res)=>{
    const userId=req.user.id;
    let orders= await getCustomerOrders(userId);
    res.send(orders);
})
module.exports = router;
