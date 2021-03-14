const Product = require('../models/product');
const shortid = require('shortid');
const dlugify = require('slugify');
const { default: slugify } = require('slugify');

module.exports.createProduct = (req, res) => {
    // return res.status(200).json({ file: req.files, body: req.body})
    // console.log(req.body);
    const { name, price, description, quantity, category, createdBy } = req.body;
    let productPictures = [];

    if (req.files.length > 0){
        productPictures = req.files.map(file => {
            return {img: file.filename};
        })
    }

    const product = new Product({
        name, 
        slug: slugify(name),
        price, 
        description, 
        productPictures, 
        category, 
        quantity,
        createdBy: req.user._id
    })

    product.save((error, product) => {
        if (error) return res.status(400).json({error});

        if (product) {
            return res.status(200).json({ product });
        }
    });
}