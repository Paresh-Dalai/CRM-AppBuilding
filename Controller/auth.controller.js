

const Constants = require('./../utils/Constants/constants')
const User = require('./../Models/Users')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const authConfig = require("./../config/auth.config")

const Signup = async (req,res) => {
      
    let userType = req.body.userType
    let userStatus = req.body.userStatus

    if(userType == Constants.userTypes.admin) {
             userStatus = Constants.userStatus.approved
    } else {
        userStatus = Constants.userStatus.approved
    }

    try {
        const createUser = await User.create({
                  name : req.body.name,
                  email : req.body.email,
                  password : bcrypt.hashSync(req.body.password , 8),
                  userType : req.body.userType,
                  userId : req.body.userId,
                  userStatus : userStatus,
        })

        res.send("userCreation successfull...").status(200)

    } catch (error) {
         console.log('error occured in connection' + error)
         res.send("internal error occured in createUser..").status(500)
    }
}

const SignIn = async (req,res) => {

    const user = await User.findOne({userId: req.body.userId})
    if(!user){
        res.status(400).send({
            message: "Failed! UserId doesn't exist"
        })
        return;
    }

    if(user.userStatus != Constants.userStatus.approved){
        res.status(403).send({
            message: "Can't allow user to login as the status is " + user.userStatus
        })
        return;
    }

    //Check if password matches
    var isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message: "Password provided is invalid"
        })
    }

    var token = jwt.sign({id: user.userId}, authConfig.secretKey, {
        expiresIn: 86400
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userTypes: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    })

}

module.exports =  {Signup,SignIn}