const express = require("express");
const { requireSignIn, adminMiddleWare } = require("../common-middleware");
const router = express.Router();
const {
    addCategory,
    getCategory,
    updateCategories,
    deleteCategories,
} = require("../controllers/category");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post(
    "/create",
    requireSignIn,
    adminMiddleWare,
    upload.single("categoryImage"),
    addCategory
);
router.get("/getCategory", getCategory);
router.post("/update", upload.array("categoryImage"), updateCategories);
router.post("/delete", deleteCategories);

module.exports = router;
