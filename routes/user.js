const {Router} = require("express");
const userRouter = Router();
const {z} = require('zod');
const bcrypt = require('bcrypt');
const {UserModel, PurchaseModel} =require("../db");
const jwt = require('jsonwebtoken');
const JWTusersecret= process.env.JWTusersecret;
const {UserMiddleware}= require("../middleware/user");

userRouter.post('/signup',async function(req,res){
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        firstName: z.string(),
        lastName: z.string()
    });
    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success)
    {
        return res.json({
            message:"Invalid Format",
            error : parsedData.error
        });
    }
    const{email, password, firstName, lastName} = parsedData.data;

    const hashedPassword  = await bcrypt.hash(password,7);
  try { await UserModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    });
         res.json({
        message: "signup Success"
    })}
    catch (error) {
        console.log(error);
    return res.status(400).json({
        message: "Signup failed",
        error: error.message
    });}
    
    
});

userRouter.post('/signin',async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({
        email : email
    })
     if(!user)
     {
         res.json({
        message: "User Does not exist"
    })
    return
     }
     else{
        const passwordMatch = bcrypt.compare(password,user.password);
        if(passwordMatch){
            const token= jwt.sign({
                id: user._id.toString()
            },JWTusersecret);
             res.json({
            token: token
        })
        }
        else{
             res.status(403).json({
            message: "Invalid Credentials"
        })
     }}

     
    
});



userRouter.get('/my', UserMiddleware, async function(req,res){

    const userId = req.userId;
    //Check that the user has paid for the courses
     const purchases=  await PurchaseModel.create({
            userId
        });
    
     res.json({
       purchases
    })
});

module.exports = {
    userRouter: userRouter
}