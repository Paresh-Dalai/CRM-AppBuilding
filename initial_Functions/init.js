const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const User = require("./../Models/Users")



async function init () {
        let findUser = await User.findOne({
            where : {
                userId : "admin"
            }
        })

        if (findUser) {
            console.log("A admin User Already Present...")
            return;

        }

        try {
          let newUser =  await User.create ({
                  name : "Paresh Dalai",
                  email : "Paresh1997@gmail.com",
                  password : bcrypt.hashSync("Paresh@123" , 8),
                  userType : "ADMIN",
                  userId : "admin"
            })
            console.log(newUser)

        } catch (error) {
              console.log("error occured ..." + error)
        }
}

module.exports = init