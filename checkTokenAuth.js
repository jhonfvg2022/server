const jwt = require('jsonwebtoken');

module.exports = function checkTokenAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {

    }
}

