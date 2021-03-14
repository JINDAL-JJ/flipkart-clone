const User = require("../models/user");
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
        const { firstName, lastName, email, password } = req.body;

        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
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
                    message: "User created successfully!",
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
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                const { firstName, lastName, email, role, fullName } = user;

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
