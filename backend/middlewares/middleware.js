const jwt= require("jsonwebtoken");
const JWT_SECRET= require('../config');

const authMiddleware= (req, res, next)=>{
    const header= req.headers.authorization;
    if(!header || !header.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "Invalid Header"
        })
    }

    const token= header.split(' ')[1];
try {
    const decoded= jwt.verify(token, JWT_SECRET);

    req.userId=decoded.userId;

    next();

} catch (error) {
    return res.status(403).json({
        msg: "Access Denied !!!"
    })
}
    
}

module.exports={authMiddleware};