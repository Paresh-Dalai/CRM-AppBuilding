
const auhJwt = require('./../Middlewares/authJwt')
const ticketVerification = require('./../Middlewares/ticketVerification')
const ticketController = require("./../Controller/ticket.controller")

// for Tickets

module.exports = function (app) {
    app.post("/crm/api/v1/tickets", [ auhJwt.verifyToken , ticketVerification.validateTicketRequestBody] , ticketController.createTicket )
    app.put("/crm/app/v1/tickets/:id" , [ auhJwt.verifyToken , ticketVerification.validateTicketStatus ] , ticketController.updateTicket )
    app.get("/crm/app/v1/tickets" , [ auhJwt.verifyToken ] , ticketController.getAllTickets )
    app.get("/crm/app/v1/tickets/getAllTickets" , [ auhJwt.verifyToken ] , ticketController.getAllTicketsInDb)
    app.get("/crm/app/v1/tickets/:id" , [ auhJwt.verifyToken ] , ticketController.getTicketsById )
    app.get("/crm/app/v1/tickets/ticketsById/:id" , [ auhJwt.verifyToken ] , ticketController.getTicketsByIdByEngineerOrCustomer )
 }