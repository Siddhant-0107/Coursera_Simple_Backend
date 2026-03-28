const {Router} = require("express");
const adminRouter = Router();
const {z} = require('zod');
const bcrypt = require('bcrypt');
const { AdminModel, CourseModel} =require("../db");
const jwt = require('jsonwebtoken');
const JWTadminsecret= process.env.JWTadminsecret;
const {adminMiddleware} = require("../middleware/admin");
adminRouter.post('/signup',async function(req,res){
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
      try { await AdminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
             res.json({
            message: "Admin signup Success"
        })}
        catch (error) {
            console.log(error);
        return res.status(400).json({
            message: "Signup failed",
            error: error.message
        });}
        
        
});
adminRouter.post('/signin',async function(req,res){
   const email = req.body.email;
       const password = req.body.password;
       const user = await AdminModel.findOne({
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
               },JWTadminsecret);
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
adminRouter.post('/course',adminMiddleware,async function(req,res){
    const adminId = req.userId;
    const {title, description, imageUrl, price}= req.body;
//watch creating a web3 saas in 6 hr for image upload 
    const course = await CourseModel.create({
        title: title,
        description: description,
        imageUrl : imageUrl,
        price: price,
        creatorId: adminId
    });

    req.json({
        message: "Course Created",
        courseId: course._id
    })
});
adminRouter.put('/course',adminMiddleware,function(req,res){
    req.json({
        message: "Its Working!!!"
    })
});
adminRouter.get('/bulk',function(req,res){
    req.json({
        message: "Its Working!!!"
    })
});

module.exports = {
    adminRouter: adminRouter
};