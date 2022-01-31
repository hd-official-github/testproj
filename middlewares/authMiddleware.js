
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const { authorization } = req.headers;
    if (!authorization)
        res.status(400).json({ err: "Unauthorised" })
    const token = authorization.split(' ')[1];
    try {
        const vf = jwt.verify(token, 'secrettoken');
        next();
    } catch (err) {
        res.status(401).json({ err: "Unauthorised", message: err.message })
    }
}