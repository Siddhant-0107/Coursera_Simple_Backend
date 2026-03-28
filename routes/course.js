const {Router} =require("express");
const courseRouter = Router();
const {PurchaseModel,CourseModel}=require("../db");
const {UserMiddleware} = require("../middleware/user");
courseRouter.post('/purchase',UserMiddleware,async function(req,res){
const userId = req.userId;
const courseId = req.body.courseId;

    await PurchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message: "Purchased Course Successfully"
    });
});

courseRouter.get('/preview',async function(req,res){
    const courses = await CourseModel.find({});

     res.json({
       courses
    })
});

module.exports = {
    courseRouter: courseRouter
}