const jwt = require('jsonwebtoken');

//middleware for wherever we require user to be signed in
module.exports.requireSignIn = (req, res, next) => {
    // console.log(req.headers);
    if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;     
    }else {
        return res.status(400).json({ message: 'Authorization required'});
    }
    next();
}

module.exports.userMiddleWare = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: 'User access denied'});
    }
    next();
}

module.exports.adminMiddleWare = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Admin access denied'});
    }
    next();
}