const bcrypt= require("bcrypt")
const saltRounds= 10;

const hashPassword= async(password)=>{
    try {
        const hashedPassword= await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}

const comparePassword= async(password, hashedPassword) =>{
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
    
}

module.exports= {hashPassword, comparePassword}