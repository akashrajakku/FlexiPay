const jwt= require("jsonwebtoken");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const JWT_SECRET= process.env.JWT_SECRET;

const authMiddleware= (req, res, next)=>{
    const header= req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({
            msg: "Invalid Header"
        })
    }

    const token= header.split(' ')[1];
try {
    
    const decoded= jwt.verify(token, JWT_SECRET);
    
    req.userId=decoded.userId;

    next();

} catch (error) {
    return res.status(401).json({
        msg: "Invalid Token !!!"
    })
}
    
}

module.exports={authMiddleware};