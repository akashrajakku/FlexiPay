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

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const receiverId = req.body.to;
        const senderId = req.userId;
        const amountToSend = req.body.amount;

        //Validating the receiver
        const receiverAccount = await Account.findOne({ userId: receiverId }).session(session);
        if (!receiverAccount) {
            return res.status(404).json({
                message: "Invalid account"
            })
        }

        //amount should be more than zero
        if(amountToSend<=0){
            return res.status(400).json({
                message: "Amount must be greater than 0"
            })
        }

        //can't send fund to yourself
        if(senderId == receiverId){
            return res.status(400).json({
                message: "Cannot transfer fund to same account"
            })
        }

        //checking if sender is having sufficient balance
        const senderAccount = await Account.findOne({ userId: senderId }).session(session);
        if (!senderAccount || senderAccount.balance < amountToSend) {
            return res.status(403).json({
                message: "Insufficient balance"
            })
        }
        
        await Account.updateOne({ userId: senderId }, { $inc: { balance: -amountToSend } }).session(session);
        await Account.updateOne({ userId: receiverId }, { $inc: { balance: amountToSend } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ 
            message: "Transaction successful" 
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ 
            message: "Internal server error"
        });
    } finally {
        session.endSession();
    }
});

module.exports= router;