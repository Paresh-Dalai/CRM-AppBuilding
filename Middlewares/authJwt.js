

const User = require("./../Models/Users");
const Constants = require("./../utils/Constants/constants")
const authConfig = require("./../config/auth.config")
const jwt = require("jsonwebtoken");


// AUthentication
const verifyToken = async (req,res,next) => {
   
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(401).send({
            message: "No token has been provided"
        })
    }

    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Request cannot be authenticated. Token is invalid"
            })
        }

        req.userId = decoded.id

        next();
    })

}


//Autherization
const isAdmin = async (req,res,next) => {
    const user = await User.findOne({
        userId: req.userId
    })

    if(user && user.userType == Constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({
            message: "Only admins are allowed this operation"
        })
    }

}

module.exports = {verifyToken,isAdmin}