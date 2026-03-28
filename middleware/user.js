const jwt = require("jsonwebtoken");
const JWTusersecret = process.env.JWTusersecret;
function UserMiddleware(req,res,next){
const token = req.headers.token;
const decodedInfo = jwt.verify(token, JWTusersecret);
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
UserMiddleware:UserMiddleware
}