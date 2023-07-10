

let mongoose = require("mongoose");

const Leads_Model = new mongoose.Schema(
    {
        name : {
            type:String,
            required:true
        } , 
        Contact : {
            type : Number,
            required : true
        } , 
        Address : {
            type : String,
            required : true
        } ,
        Gender : {
            type : String,
            required : true,
            default : "MALE"
        } ,
        Email : {
            type : String,
            required : true
        }
        }
)

module.exports = mongoose.model("Leads_Model" , Leads_Model)