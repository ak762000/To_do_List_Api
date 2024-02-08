const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401).json({ message: 'Token expired' });
                } else {
                    res.status(401).json({ message: 'Invalid token' });
                }
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'User is not authorized or token is missing' });
    }
};

module.exports = auth;
