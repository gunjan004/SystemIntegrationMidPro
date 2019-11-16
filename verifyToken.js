const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){

    const token = req.header('token');

    if(!token) return res.status(400).send({
        status : res.statusCode,
        message : 'Access Denied.. Token not provided'
    });

    try {
        const tokenVerify = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = tokenVerify;
        next();
    } catch(err){
        res.status(401).send({
            status : res.statusCode,
            message : "Invalid Token"
        })
    }
};
