const mongoose = require('mongoose');
const { email } = require('zod');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    email : {type:String, unique:true},
    password: String,
    firstName: String,
    lastName : String

});

const AdminSchema = new Schema({
    email : {type:String, unique:true},
    password: String,
    firstName: String,
    lastName : String

});

const CourseSchema = new Schema({
    title : {type:String, unique:true},
    description: String,
    price: Number,
    imageUrl : String,
    creatorId: ObjectId
});

const PurchaseSchema = new Schema({
    
    courseId: ObjectId,
    userId: ObjectId
});

const UserModel = mongoose.model("user",UserSchema);
const AdminModel= mongoose.model("admin",AdminSchema);
const CourseModel = mongoose.model("course", CourseSchema);
const PurchaseModel= mongoose.model("purchase",PurchaseSchema);

module.exports ={
    UserModel: UserModel,
    AdminModel: AdminModel,
    CourseModel: CourseModel,
    PurchaseModel: PurchaseModel
}

