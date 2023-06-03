


const mongoose = require("mongoose");
const express = require("express")
const bodyParser = require("body-parser")
const dbConfig = require('./config/db.config')
const portNo = require('./config/server.config')
const expressApp = express()
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended : true}))

// const init = require("./initial_Functions/init");

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on('error' , () => {
    console.log("error occured while connecting to DB")
})

db.once('open' , () => {
    console.log("connected successfully to MongoDB");
    // init();
})

require("./Routes/auth.route") (expressApp)

require("./Routes/ticket.route") (expressApp)

expressApp.listen(portNo.PORT, () => {
    console.log('srver is running on port no. --' + portNo.PORT)
})