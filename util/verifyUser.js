const jwt = require('jsonwebtoken');

function verifyUser(req, res, next){
    const token = req.cookies.EcoSportsToken;
    if(!token){
        res.status(403).json({ message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err){
            res.status(405).json({ message: "Access Denied: Wrong Token Provided"})
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyUser;