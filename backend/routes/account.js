const express= require("express");
const zod= require("zod")
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router= express.Router();

router.get("/balance", authMiddleware, async (req, res)=>{
    try {
        const balanceId= req.userId;
        const balanceAccount= await Account.findOne({userId: balanceId});
        res.status(200).json({
            balance: balanceAccount.balance
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.post("/transfer", authMiddleware, async(req, res)=>{

    const session= await mongoose.startSession();
    session.startTransaction();

    try {
        const receiverId= req.body.to;
        const senderId= req.userId;
        const amountToSend= req.body.amount;

        const validationCheck= await Account.findOne({userId: receiverId});
        if(!validationCheck){
            await session.abortTransaction();
            session.endSession();

            res.status(400).json({
                message: "Invalid account"
            })
        }

        const senderBalance= await Account.findById(senderId).balance;
        if(senderBalance < amountToSend){
            await session.abortTransaction();
            session.endSession();

            res.status(400).json({
                message: "Insufficient Balance"
            })
        }

        await Account.updateOne({userId: senderId} , {$inc: {balance: -amountToSend}}).session(session);
        await Account.updateOne({userId: receiverId} , {$inc: {balance: amountToSend}}).session(session);

        await session.commitTransaction();

        res.status(200).json({
            message: "Transaction Successful"
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal server error", error });
    }

})
module.exports= router;