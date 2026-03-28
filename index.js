require('dotenv').config();
const express = require('express');
const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const {adminRouter} = require('./routes/admin')


const DB_Link = process.env.DB_Link;
console.log("DB_Link:", DB_Link);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {z} = require('zod');

const app = express();
app.use(express.json());
 app.use('/api/v1/user', userRouter);
 app.use('/api/v1/course', courseRouter);
 app.use('/api/v1/admin', adminRouter);


async function main(){
    try {
await mongoose.connect(DB_Link);
console.log("Database connected");
app.listen(3000);} 

catch(error){
   console.log("DB connection error:", err);
}
}
main();



