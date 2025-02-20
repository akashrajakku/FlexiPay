const express= require("express");
const {User, Account}= require("../db");
const router= express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {hashPassword, comparePassword}= require("../utils/PasswordUtils");
const {authMiddleware}= require("../middlewares/middleware")
const dotenv = require('dotenv');
const path = require('path');
const { error } = require("console");
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET= process.env.JWT_SECRET;

//zod schema
const signupSchema = zod.object({
  username: zod.string().email().min(10).max(100),
  password: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50)
});

class signupError extends Error{
    constructor(message, errorCode, errorType) {
      super(message);
      this.errorCode=errorCode;
      this.errorType=errorType;
    }
}

//error handling and data storage
router.post("/signup", async (req, res) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);
    console.log(validationResult);
    
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        let errorMessage = "";
        for (const error of errors) {
          if (error.path[0] === "username") {
            errorMessage = "Email must be minimum of 10 characters";
          } else if (error.path[0] === "password") {
            errorMessage = "Password should be minimum of 6 characters";
          } else if (error.path[0] === "firstName" || error.path[0] === "lastName") {
            errorMessage = `${error.path[0]} should not exceed 50 characters`;
          }
          break;
        }

        throw new signupError(`${errorMessage}`|| `Invalid Input`, 400, "Invalid Input");
      }
    
    
    const hashedPassword= await hashPassword(req.body.password);
    const username= req.body.username;
    const existingUser= await User.findOne({username});
    if (existingUser) {
      throw new signupError("Username already exists", 409, "Duplicate User")
    }

    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    });

    const newAccount= await Account.create({
      userId: newUser._id,
      balance: Math.floor(Math.random()*10000)+1
    })

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.status(201).json({
      message: "User created successfully",
      token: token,
      userId: newUser._id,
      balance: newAccount.balance
    });
  } catch (error) {
      if(error instanceof signupError){
        res.status(error.errorCode).json({
          error:{
              type: error.errorType,
              message: error.message
          }
        })
      }else{
        res.status(error.errorCode).json({
          error:{
              type: "SYSTEM_ERROR",
              message: "An Unexpected error occurred"
          }
        }) 
      }
  }
});


const loginSchema= zod.object({
  username: zod.string().email(),
  password: zod.string()
});

class AuthError extends Error{
  constructor(message, errorCode, errorType) {
      super(message);
      this.errorCode=errorCode;
      this.errorType=errorType;
  }
}

router.post("/login", async(req,res)=>{
  try{
    const {success}= loginSchema.safeParse(req.body);
    if(!success){
      throw new AuthError("You have entered incorrect value", 411, "Incorrect Input");
    }

    const {username, password}= req.body;

    const user= await User.findOne({
      username
    });

    if(!user){
      throw new AuthError("Email not found. Please check and try again.", 401, "Incorrect Username");
    }

    const passwordMatch= await comparePassword(password, user.password);

    if(!passwordMatch){
      throw new AuthError("Incorrect password. Please try again.", 401, "Incorrect Password");
    }

    const token= jwt.sign({userId: user._id}, JWT_SECRET);
    res.status(200).json({message: "Log in Success", token, userId: user._id});
  }
  
  catch(error){
    if(error instanceof AuthError){
        res.status(error.errorCode).json({
            error:{
                type: error.errorType,
                message: error.message
            }
        })
    }else{
      res.status(error.errorCode).json({
        error:{
            type: "SYSTEM_ERROR",
            message: "An Unexpected error occurred"
        }
      })
    }
  }
})

//optional zod schema for update
const updateSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().max(50).optional(),
  lastName: zod.string().max(50).optional(),
});
router.put('/', authMiddleware, async(req, res)=>{
    try {
      const{success}= updateSchema.safeParse(req.body);
      if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    const updates={};
    if(req.body.firstName) updates.firstName= req.body.firstName;
    if(req.body.lastName) updates.lastName= req.body.lastName;
    if(req.body.password) updates.password= await hashPassword(req.body.password);

    const update_result= await User.updateOne({_id: req.userId}, {$set: updates});

    if(update_result.modifiedCount > 0){
        res.status(200).json({
          message: "Updated successfully"
      })
    }
    else {
      res.status(404).json({ message: 'User not found or no changes made' });
  }
    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
})

//to get user based on query provided as firstname/lastname
const querySchema= zod.object({
  filter: zod.string().max(50)
})

router.get('/bulk', async(req, res)=>{
  try {
      const{success}= querySchema.safeParse(req.query);

      if(!success){
        res.status(400).json({
          message: "Invalid Query, Provide a String query of max length 50"
        })
      }

    const filter= req.query.filter || "";

    const filtered_users= await User.find({
      $or: [
        {firstName: filter},
        {lastName: filter}
      ]
    })

    users= filtered_users.map((user)=>{
      return{
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
      }
    })
    
    if(filtered_users.length > 0){
      res.status(200).json({
         users
      })
    }else{
      res.status(200).json({
        message: "No user found"
      })
    }

    } catch (error) {
        res.status(500).json({
          message: "Internal Server Error"
        })
    }
    
})
module.exports= router;