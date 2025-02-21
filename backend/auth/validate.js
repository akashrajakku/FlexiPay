const express = require("express");
const router= express.Router();
const {authMiddleware}= require("../middlewares/middleware");

router.get("/validate", authMiddleware, (req, res)=>{
    res.status(200).json({
        success:true,
        userId:req.userId
    })
})

module.exports=router;