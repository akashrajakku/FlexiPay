const express= require("express");
const {User}= require("../db");
const router= express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {hashPassword}= require("../utils/PasswordUtils");

//zod schema
const signupSchema = zod.object({
  username: zod.string().min(6).max(30),
  password: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50)
});

//error handling and data storage
router.post("/signup", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
      const validationResult = signupSchema.safeParse(req.body);
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        let errorMessage = "";
        for (const error of errors) {
          if (error.path[0] === "username") {
            errorMessage = "Username should be between 6 and 30 characters";
          } else if (error.path[0] === "password") {
            errorMessage = "Password should be minimum of 6 characters";
          } else if (error.path[0] === "firstName" || error.path[0] === "lastName") {
            errorMessage = `${error.path[0]} should not exceed 50 characters`;
          }
          break;
        }

        return res.status(400).json({
          message: errorMessage || "Invalid input"
        });
      }
    }
    const hashedPassword= await hashPassword(req.body.password);
    
    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.status(201).json({
      message: "User created successfully",
      token: token,
      userId: newUser._id
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.post("/login", async(req,res)=>{
  try{
    const {username, password}= req.body;
    const user= await User.findOne({username});
    if(!user){
      return res.status(401).json({message: "Invalid username or password"});
    }
    const passwordMatch= await comparePassword(password, user.password);
    if(!passwordMatch){
      return res.status(401).json({message: "Invalid username or password"});
    }
    const token= jwt.sign({userId: user._id}, JWT_SECRET);
    res.status(200).json({token, userId: user._id});
  }
  catch(error){
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})



module.exports= router;