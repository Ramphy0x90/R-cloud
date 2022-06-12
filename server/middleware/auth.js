const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) return res.status(403).send('Authentication required');

    jwt.verify(token, authConfig.secret, (error, decoded) => {
        if(error) res.status(401).json({msg: 'Invalid token'});
        else res.user = decoded;

        return next();
    });    
}

module.exports = checkToken;