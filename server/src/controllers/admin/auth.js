const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

module.exports.signUp = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user)
            return res.status(400).json({
                message: "email already in use",
            });
        // console.log(req.body);
        const role = "admin";
        const { firstName, lastName, email, password } = req.body;

        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            role,
            username: shortid.generate(),
        });

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong",
                    error: error,
                });
            }

            if (data) {
                return res.status(200).json({
                    message: "Admin created successfully!",
                });
            }
        });
    });
};

module.exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (error)
            return res
                .status(400)
                .json({ message: "error while finding user", error });

        if (user) {
            if (user.authenticate(req.body.password) && user.role == "admin") {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName,
                } = user;
                res.cookie("token", token, { expiresIn: "1d" });
                res.status(200).json({
                    token,
                    user: {
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    },
                });
            }
        } else {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }
    });
};

module.exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...",
    });
};
