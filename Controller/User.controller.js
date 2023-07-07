

const User = require("./../Models/Users")
const Constants = require("./../utils/Constants/constants")

const getAllUsers = async (req,res) => {
    try {
       
        let OurUsers = await User.find()

   // for showing userDetails except userPassword
   if(OurUsers) {
      
    let userData = [];
    OurUsers.forEach((user) => {
       userData.push({
           name : user.name,
           userId : user.userId,
           email : user.email,
           userType : user.userType,
           userStatus : user.userStatus
       })
   })
   res.send(userData).status(200)
   }
    } catch (error) {
        res.send("error occured...").status(500)
    }
}

const getAllUsersUserType = async (req,res) => {
      
    let enteredUserType = req.params.userType;
    let OurUsers;
    try {
       
        // let OurUsers = await User.find({userType : Constants.userTypes.engineer || Constants.userTypes.customer})
     if(enteredUserType == Constants.userTypes.customer) {
         OurUsers = await User.find({userType : CUSTOMER})
     }else if(enteredUserType == Constants.userTypes.engineer){
         OurUsers = await User.find({userType : ENGINEER})
     }
        

   // for showing userDetails except userPassword
   if(OurUsers) {
      
    let userData = [];
    OurUsers.forEach((user) => {
       userData.push({
           name : user.name,
           userId : user.userId,
           email : user.email,
           userType : user.userType,
           userStatus : user.userStatus
       })
   })
   res.send(userData).status(200)
   }
    } catch (error) {
        res.send("error occured...").status(500)
    }
}


const getUserById = async (req,res) => {
     
    let entereduserId = req.params.userId;
     
    let userFound = await User.find({ userId : entereduserId } )

    if(userFound) {
        let userData = [];
         userFound.forEach((user) => {
           userData.push({
               name : user.name,
               userId : user.userId,
               email : user.email,
               userType : user.userType,
               userStatus : user.userStatus
           })
       })
       res.send(userData).status(200)

    } if (!userFound) {
          res.send("No User found with entered userId..").status(201)
    }

   
}

const updateUserDetails = async (req,res) => {
      
    const userIdReq = req.params.userId

    try{
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        }, {
            name: req.body.name,
            userStatus: req.body.userStatus ,
            userType: req.body.userType
        }).exec();

        if(user){
            return res.status(200).send({
                message: "User updated successfully"
            })
        }
    }catch(err){
        res.status(500).send({
            message: "Some internal server error occured"
        })
    }
}

module.exports = {getAllUsers,getUserById,updateUserDetails,getAllUsersUserType}