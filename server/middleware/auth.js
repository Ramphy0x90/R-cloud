const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) res.status(403).send('Authentication required');

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error) res.status(401).send('Invalid token');
        else req.user = decoded;

        return next();
    });    
}

module.exports = checkToken;