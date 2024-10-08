const express= require("express");
const crypto= require("crypto");
const nodemailer= require("nodemailer");
const {User, Account}= require("../db");
const router= express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {hashPassword, comparePassword}= require("../utils/PasswordUtils");
const {authMiddleware}= require("../middlewares/middleware")
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET= process.env.JWT_SECRET;
const FLEXIPAY_MAIL= process.env.FLEXIPAY_MAIL;
const FLEXIPAY_PW= process.env.FLEXIPAY_PW;

const authSchema= zod.object({
  username: zod.string().email().min(6).max(30)
})

let otpStore={} //temporary storage for otp

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: FLEXIPAY_MAIL,
    pass: FLEXIPAY_PW,
  },
});

router.post("/auth", async (req, res)=>{
  try {
    const username= req.body.username;
  //schema checking --> entered value is email or not 
  const validationResult= authSchema.safeParse(username);
  if(!validationResult){
    res.status(400).json({
      message: "Enter a valid email address"
    })
  }

  //if user already exists
  const existingUser= await User.findOne({username});
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

  const otp= crypto.randomInt(100000, 999999).toString();
  otpStore[username]=otp;

  const mailOptions = {
    from: FLEXIPAY_MAIL,
    to: username,
    subject: "Signup with your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false });
    }
    res.json({ 
      success: true, 
      messageId: info.messageId,
      response: info.response 
    });
  });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
    })    
  }

})
//zod schema
const signupSchema = zod.object({
  username: zod.string().email().min(6).max(30),
  password: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50)
});

//error handling and data storage
router.post("/signup", async (req, res) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);
      if (!validationResult.success) {
        const errors = validationResult.error.errors;
        let errorMessage = "";
        for (const error of errors) {
          if (error.path[0] === "username") {
            errorMessage = "Username should contain an email";
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

    const hashedPassword= await hashPassword(req.body.password);
    
    const username= req.body.username;
    const existingUser= await User.findOne({username});
    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists"
      });
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
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

const loginSchema= zod.object({
  username: zod.string().email(),
  password: zod.string()
});

router.post("/login", async(req,res)=>{
  try{
    const {success}= loginSchema.safeParse(req.body);
    if(!success){
      return res.status(411).json({
        msg:"Incorrect Input"
      })
    }

    const {username, password}= req.body;

    const user= await User.findOne({
      username
    });

    if(!user){
      return res.status(401).json({message: "Invalid username"});
    }

    const passwordMatch= await comparePassword(password, user.password);

    if(!passwordMatch){
      return res.status(401).json({message: "Invalid password"});
    }

    const token= jwt.sign({userId: user._id}, JWT_SECRET);
    res.status(200).json({token, userId: user._id});
  }
  catch(error){
    res.status(500).json({
      message: "Internal server error"
    });
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