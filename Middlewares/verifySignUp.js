


const UserModel = require("./../Models/Users");

const Constants = require('./../utils/Constants/constants')

const verifySignUp = async (req,res,next) => {
         
    // 1. validate UserName

    if(!req.body.name) {
        res.send("Please Enter UserName").status(400)
        return;
    }

    // 2. validate userId 

    if(!req.body.userId) {
        res.send("Please Enter userId").status(400)
        return;
    }

    // 3. if entered userId already exists

    let User = await UserModel.findOne({where : {userId : req.body.userId}})

    if(User) {
        res.send("Entered userId already exists in Our DB..")
        return;
    }

    // 4. if mailId already exists

    let UserEmail = await UserModel.findOne({where : {userId : req.body.userId}})

    if(UserEmail) {
        res.send("Entered MailId is  already exists in Our DB..")
        return;
    }

    // 5. validate userType
    const userType = req.body.userType;
    const ouruserTypes = [
        Constants.userTypes.admin,
        Constants.userTypes.customer,
        Constants.userTypes.engineer,
        Constants.userTypes.sales_rep
    ]

    if(userType && !ouruserTypes.includes(userType)) {
        res.send("userType doesn't match...").status(400)
        return;
    }

    next()
}

module.exports = {verifySignUp}