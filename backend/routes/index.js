const express= require("express");
const userRouter= require("./user");
const accountRouter= require("./account");
const authRouter= require("../auth/validate")

const router= express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/auth", authRouter);

module.exports= router;
