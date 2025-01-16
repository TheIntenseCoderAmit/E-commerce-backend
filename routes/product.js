const express = require('express');
const {addproduct, updateProduct, deleteProduct, getProductById, getAllProducts} = require("../handlers/product-handler");
const router= express.Router();

 router.post('/', async (req, res) => {
    let model=req.body;
    let product=await addproduct(model);
    res.send(product);
});

router.put('/:id', async (req, res) => {
    let model=req.body;
    let id=req.params["id"];
   await updateProduct(id,model);
    res.send({message:"updated successfully."});
});

router.delete('/:id', async (req, res) => {

    let id=req.params["id"];
    await deleteProduct(id);
    res.send({message:"deleted successfully."});
});

router.get('/:id', async (req, res) => {

    let id=req.params["id"];
    let products= await getProductById(id);
    res.send(products);
});

router.get('', async (req, res) => {


    let product= await getAllProducts();
    res.send(product);
});
module.exports = router;