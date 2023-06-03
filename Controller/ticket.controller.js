const User = require("./../Models/Users")
const Ticket = require('./../Models/Tickets')
const Constants = require('./../utils/Constants/constants')
const Tickets = require("./../Models/Tickets")
const Users = require("./../Models/Users")
const emailSend = require("./../utils/Constants/NotificationSend")

const createTicket = async (req,res) => {
    

    const ticketObject = {
        
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId //this is coming from authJwt middleware
    }

    //Assign an engineer to the ticket which is in Approved state
    const engineer = await User.findOne({
        userType: Constants.userTypes.engineer,
        userStatus: Constants.userStatus.approved
    })

    ticketObject.assignee = engineer.userId

    try{
        const ticket = await Ticket.create(ticketObject)

        if(ticket){
            //Update the customer
            const user = await User.findOne({
                userId: req.userId
            })

            user.ticketsCreated.push(ticket._id);
            await user.save()

            //Update the engineer
            if(engineer){
                engineer.ticketsAssigned.push(ticket._id)
                await engineer.save()
            }

            emailSend(
                ticket._id,
                `ticket with ${ticket._id} updated and is in status ${ticket.status}`,
                ticket.description,
                ['Pareshdalai143@gmail.com'],
                ticket.reporter
            )

            // return res.status(200).send(ticket)
            return res.status(200).send("ticket created successfully")
        }
    }catch(err){
        return res.status(500).send({
            message: "Some internal  error occured"
        })
    }
}


const updateTicket = async (req,res) => {

    // logic -- Ticket can only be updated by the customer who has created it...

    const ticket = await Ticket.findOne({_id: req.params.id})
    const ourUsers = await Users.findOne({userId : req.userId})

    if(ticket && ticket.reporter == req.userId || ticket.assignee == req.userId || ourUsers.userType == Constants.userTypes.admin ){
        //Allowed to update
        ticket.title = req.body.title != undefined ? req.body.title : ticket.title,
        ticket.description = req.body.description != undefined ? req.body.description: ticket.description,
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority,
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status

        var updatedTicket = await ticket.save()

        return res.status(200).send(updatedTicket)
    }else{
        res.status(401).send({
            message: "Ticket can only be updated by the customer who created it"
        })
    }

}


const getAllTickets = async (req,res) => {

    try {
      
        const getTickets = await Tickets.find()
        const ourUsers = await Users.findOne({userId : req.userId})

        if(getTickets && ourUsers.userType == Constants.userTypes.engineer || ourUsers.userType == Constants.userTypes.admin) {
            let allTickets = [];
            getTickets.forEach((ticket) => {
                allTickets.push(
                    {
                        id : ticket.id,
                        title : ticket.title,
                        description : ticket.description,
                        reporter : ticket.reporter,
                        ticketPriority : ticket.ticketPriority,
                        status : ticket.status
                    }
                )
            })
            res.send(allTickets).status(200)
        }
    } catch(error) {
          res.send("Error occured when fetch with Tickets").status(500)
    }

}

const getTicketsByIdByEngineerOrCustomer = async (req,res) => {
    
    
  //LOGIC -- that customer to allow to update the tickets who has raised the tickets
    
    const tktById = {}

    const ourUsers = await Users.find({userId : req.userId})

    if(req.query.status != undefined){
        queryObject.status = req.query.status
    }

    if(req.query.ticketPriority != undefined){
        queryObject.ticketPriority = req.query.ticketPriority
    }

    
     if (ourUsers.userType == Constants.userTypes.engineer) {
        tktById.assignee = req.userId
    } else {
        tktById.reporter = req.userId
}
    const ticket = await Tickets.findOne(tktById) 
    return res.status(200).send(ticket)
}

const getTicketsById = async (req,res) => {
   
    const requiredTicketId = req.params.id;
    const getTicketById = await Tickets.find({ _id : requiredTicketId })
    const ourAdmin = await Users.findOne({userId : req.userId})

    try {
           
        if (getTicketById && ourAdmin.userType == Constants.userTypes.admin) {
        
            let foundTicket = [];
            getTicketById.forEach((ticket) => {
                foundTicket.push(
                    {
                            title : ticket.title,
                            description : ticket.description,
                            reporter : ticket.reporter,
                            ticketPriority : ticket.ticketPriority,
                            status : ticket.status
                    }
                  )
            })
            
    
        res.send(foundTicket).status(200)
    
        } else if(!getTicketById) {
             res.send("No Tickets Found..").status(500)
        } else {
            res.send("only admin have the access to get all the tickets..").status(500)
        }
    
    } catch (error) {
        res.send("error" + error).status(500)
    }
    
}

module.exports = {createTicket,updateTicket,getAllTickets,getTicketsById,getTicketsByIdByEngineerOrCustomer}