const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();




async function RegisterUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  try{
   const hashedpassword = await bcrypt.hash(password, saltRounds);
   const newuser = new User({
    username: username,
    password: hashedpassword,
    email: email,
    role:role,
  });
  await newuser.save();
  res.send("User Registered");
}catch(err){
  console.log(err);
  res.status(500).send("Error registering user");
}
}



async function LoginUser(req,res){
    const username= req.body.username;
    const password= req.body.password;
    try{
        const user= await User.findOne({username: username});
        if(!user){
            return res.status(400).send("User not found");
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).send("Invalid credentials");
        }
        const jwttoken= jwt.sign({username:user.username,role:user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
        return res.status(200).json({"message": "User login Successful", token: jwttoken});
    }catch(err){
        console.log(err);
        res.status(500).send("Error logging in");
    }

}

module.exports = { RegisterUser,LoginUser };
