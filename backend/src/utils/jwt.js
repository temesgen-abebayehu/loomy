const jwt = require('jsonwebtoken');

// Sign JWT and return
const getSignedJwtToken = function (id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = {
    getSignedJwtToken
}
