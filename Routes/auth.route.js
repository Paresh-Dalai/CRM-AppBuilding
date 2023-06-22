
const authController = require('./../Controller/auth.controller')
const Middlewares = require("./../Middlewares/verifySignUp")
const AuthMiddlewares = require("./../Middlewares/authJwt")
const UserController = require("./../Controller/User.controller")

// for User
 module.exports = function(app){
   app.post("/crm/api/v1/auth/signup", [Middlewares.verifySignUp], authController.Signup)
   app.post("/crm/api/v1/auth/signin", authController.SignIn)
   app.get("/crm/api/v1/users"  , UserController.getAllUsers)
   app.get("/crm/api/v1/users/:userId" , [AuthMiddlewares.verifyToken , AuthMiddlewares.isAdmin] , UserController.getUserById)
   app.put("/crm/api/v1/users/:userId" , [AuthMiddlewares.verifyToken , AuthMiddlewares.isAdmin] , UserController.updateUserDetails)
}





