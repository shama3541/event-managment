const jwt= require("jsonwebtoken");
require("dotenv").config();

const verifyToken= (req,res,next)=>{
    const authHeader = req.header("Authorization");// lowercase!
   if (!authHeader) {
    return res.status(403).send("A token is required for authentication");
   }
const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next()
    }catch(err){
        return res.status(401).send("Invalid Token");
    }

}

module.exports = {verifyToken};