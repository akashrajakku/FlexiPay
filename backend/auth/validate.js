const express = require("express");
const router= express.Router();
const {authMiddleware}= require("../middlewares/middleware");
const {User} =require("../db")
const mongoose = require("mongoose")

const findFirstName = async(userId)=>{
    try {
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(userId)
        })

        if(!user){
            console.log("user not found");
            return "User";
        }

        return user.firstName;

    } catch (error) {
        console.log(error);
        return "User";
    }
}

router.get("/validate", authMiddleware, async(req, res)=>{
    try {
        const firstName = await findFirstName(req.userId);

        res.status(200).json({
            success:true,
            userId:req.userId,
            firstName: firstName
        })
    } catch (error) {
        console.log(`error: ${error}`);
    }
})

module.exports=router;