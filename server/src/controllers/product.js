const Product = require("../models/product");
const shortid = require("shortid");
const dlugify = require("slugify");
const { default: slugify } = require("slugify");
const Category = require("../models/category");

module.exports.createProduct = (req, res) => {
    // return res.status(200).json({ file: req.files, body: req.body})
    // console.log(req.body);
    const {
        name,
        price,
        description,
        quantity,
        category,
        createdBy,
    } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id,
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });

        if (product) {
            return res.status(200).json({ product });
        }
    });
};

module.exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select("_id")
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({ error });
            }

            if (category) {
                Product.find({ category: category._id }).exec(
                    (error, products) => {
                        if (error) {
                            return res.status(400).json({ error });
                        }
                        if (products.length > 0) {
                            return res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter(
                                        (product) => product.price <= 5000
                                    ),
                                    under10k: products.filter(
                                        (product) =>
                                            product.price > 5000 &&
                                            product.price <= 10000
                                    ),
                                    under15k: products.filter(
                                        (product) =>
                                            product.price > 10000 &&
                                            product.price <= 15000
                                    ),
                                    under20k: products.filter(
                                        (product) =>
                                            product.price > 15000 &&
                                            product.price <= 20000
                                    ),
                                    under30k: products.filter(
                                        (product) =>
                                            product.price > 20000 &&
                                            product.price <= 30000
                                    ),
                                },
                            });
                        }
                    }
                );
            }
        });
};
