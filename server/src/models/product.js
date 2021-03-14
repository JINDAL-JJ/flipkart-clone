const mongoose = require('mongoose');
const User = require('./user');
const Category = require('./category');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    offer: {
        type: Number
    },
    productPictures: [
        {img: {type: String}}
    ],
    reviews: [
        {
            userId:{ type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'}, 
            review: String
        }
    ],
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedAt: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
