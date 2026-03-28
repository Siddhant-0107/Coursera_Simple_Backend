const jwt = require("jsonwebtoken");
const JWTadminsecret = process.env.JWTadminsecret;
function AdminMiddleware(req,res,next){
const token = req.headers.token;
const decodedInfo = jwt.verify(token, JWTadminsecret);
    if(decodedInfo){
        req.userId = decodedInfo.id;
        next();
    }
    else{
        res.status(403).json({
            message:"You are not Signed in"
        })
    }
}

module.exports={
AdminMiddleware:AdminMiddleware
}