const jwt = require('jsonwebtoken');
const secret = "RESTAPI";  
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log("No token provided");
        return res.status(403).json({ error: 'No token provided' });
    }

    let token = authHeader.split(" ")[1];

    if (!token) {
        console.log("Invalid token format");
        return res.status(403).json({ error: 'Invalid token format' });
    }

    token = token.replace(/^"|"$/g, '');


    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error("Token Verification Error:", err.message);
            return res.status(401).json({
                error: 'Failed to authenticate token',
                details: err.message
            });
        }

        req.user = decoded.data;
        next();
    });
};


module.exports = checkToken;
