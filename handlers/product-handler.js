const Product = require('./../db/product');
const {model} = require("mongoose");


async function addproduct(model) {
    let product = new Product({
        ...model
    })
    await product.save();
    return product.toObject();
}

async function updateProduct(id, model) {
    await Product.findByIdAndUpdate(id, model);
}

async function deleteProduct(id) {
    await Product.findByIdAndDelete(id);
}

async function getAllProducts() {
    let products = await Product.find();
    return products.map(x => x.toObject());
}

async function getProductById(id) {
    let product = await Product.findById(id);
    return product.toObject();
}

async function getNewProduct() {
    let newProduct = await Product.find({
        isNewProducts: true
    });
    return newProduct.map(x => x.toObject());
}


async function getFeaturedProduct() {
    let featuredProduct = await Product.find({
        isFeatured: true
    });
    return featuredProduct.map(x => x.toObject());
}

async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId) {

    if (!sortBy) {
        sortBy = 'price';
    }
    if (!sortOrder) {
        sortOrder = -1;
    }
    let queryFilter = {};
    if (searchTerm) {
        queryFilter.$or = [{name: {$regex: '.*' + searchTerm + '.*'}},
            {shortDescription: {$regex: '.*' + searchTerm + '.*'}}
        ];


    }
    if (categoryId) {
        queryFilter.categoryId = categoryId
    }
    if (brandId) {
        queryFilter.brandId = brandId;
    }
    const product = await Product.find(queryFilter).sort({[sortBy]: +sortOrder}).skip((+page - 1) * +pageSize).limit(+pageSize);
    return product.map(x => x.toObject());
}

module.exports = {
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    addproduct,
    getFeaturedProduct,
    getNewProduct,
    getProductForListing
}