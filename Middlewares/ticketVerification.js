

const Constants = require("./../utils/Constants/constants")

const validateTicketRequestBody = (req,res,next) => {
     let requiredTitle = req.body.title;
     let requiredDescription = req.body.description;

     if(!requiredTitle) {
        res.send("Title was not provided..").status(400)
     }

     if(!requiredDescription) {
        res.send("Description was not provided...").status(400)
     }
     next();
}

const validateTicketStatus = (req,res,next) => {

    let requiredStatus = req.body.status;
    let ourStatusField = 
    [
        Constants.ticketStatus.open,
        Constants.ticketStatus.closed,
        Constants.ticketStatus.blocked,
        Constants.ticketStatus.inProgress
    ];

    if(requiredStatus && !ourStatusField.includes(requiredStatus)) {
        res.send("Failed!! status provided is Invalid...").status(400)
    }

    next();
}

module.exports = {validateTicketRequestBody,validateTicketStatus}