const jwt = require("jsonwebtoken");
const router = require("../routes/auth");


function verifyToken(req, res, next) {
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).send('Access denied');
    }
    try{
        const decode=jwt.verify(token,"secret");
        req.user=decode;
        next();
    }catch(err){
        return res.status(401).send({
            error:"token-error",
        });
    }
}

function isAdmin(req, res, next){
if(req.user && req.user.isAdmin){
    next();
}else{
    return res.status(403).send('Forbidden');
}
}
module.exports = {verifyToken,isAdmin};