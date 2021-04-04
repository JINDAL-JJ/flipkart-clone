const slugify = require("slugify");
const Category = require("../models/category");
const shortid = require("shortid");

module.exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}=${shortid.generate()}`,
    };

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    if (req.file) {
        categoryObj.categoryImage =
            process.env.API + "/public/" + req.file.filename;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (category) {
            return res.status(201).json({ category });
        }
    });
};

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id),
        });
    }
    return categoryList;
}

module.exports.getCategory = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });

        if (categories) {
            const categoryList = createCategories(categories);
            return res.status(200).json({ categoryList });
        }
    });
};

module.exports.updateCategories = async (req, res) => {
    // console.log(req.body);
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];

    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i],
            };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];
            }

            const updatedCategory = await Category.findByIdAndUpdate(
                { _id: _id[i] },
                category,
                { new: true }
            );
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updatedCategories: updatedCategories });
    } else {
        const category = {
            name: name[i],
            type: type[i],
        };
        if (parentId !== "") {
            category.parentId = parentId[i];
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            { _id },
            category,
            { new: true }
        );
        return res.status(201).json({ updatedCategory });
    }
};

module.exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findByIdAndDelete({
            _id: ids[i]._id,
        });
        deletedCategories.push(deleteCategory);
    }

    if (deletedCategories.length == ids.length) {
        res.status(200).json({ messgae: "Categories removed" });
    } else {
        res.status(400).json({ message: "Something went wrong" });
    }
};
