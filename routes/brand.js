const express = require('express');

const {addBrand, updateBrand, deleteBrand, getBrand, getBrands} = require("../handlers/brand-handler");
const router = express.Router();


router.post('', async (req, res) => {

    let model=req.body;
    let result=await addBrand(model);
    res.send(result);
});

router.put('/:id', async (req, res) => {

    let model=req.body;
    let id=req.params["id"];
    let result=await updateBrand(id,model);
    res.send({message:"updated successfully."});
});

router.delete('/:id', async (req, res) => {


    let id=req.params["id"];
    let result=await deleteBrand(id);
    res.send({message:"deleted  successfully."});
});

router.get('/:id', async (req, res) => {

    let id=req.params["id"];
    let brand=await getBrand(id);
    res.send(brand);
});

router.get('', async (req, res) => {
    console.log("here");

    let brands=await getBrands();
    res.send(brands);
});

module.exports = router;