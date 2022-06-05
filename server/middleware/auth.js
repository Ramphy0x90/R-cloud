const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) res.status(403).send('Authentication required');

    let decoded = jwt.verify(token, 'secret', (error) => {
        res.status(401).send('Invalid token');
    });
    req.user = decoded;

    return next();
}

module.exports = checkToken;