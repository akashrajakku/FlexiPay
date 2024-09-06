const jwt= require("jsonwebtoken");
const config_obj= require('../config');

const authMiddleware= (req, res, next)=>{
    const header= req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')){
        return res.status(401).json({
            msg: "Invalid Header"
        })
    }

    const token= header.split(' ')[1];
try {
    
    const decoded= jwt.verify(token, config_obj.JWT_SECRET);
    
    req.userId=decoded.userId;

    next();

} catch (error) {
    return res.status(401).json({
        msg: "Invalid Token !!!"
    })
}
    
}

module.exports={authMiddleware};