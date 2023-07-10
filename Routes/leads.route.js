

const auhJwt = require('./../Middlewares/authJwt')

const LeadController = require("./../Controller/leads.controller")


// for User
 module.exports = function(app){
   app.post("/crm/app/v1/createLeads"  , LeadController.createLead)
   app.get("/crm/app/v1/Leads" , [ auhJwt.verifyToken ] , LeadController.getAllLeads)
   app.get("/crm/app/v1/Leads/:leadId" , [ auhJwt.verifyToken ] , LeadController.getLeadById)
   app.put("/crm/app/v1/Leads/:leadId" , [ auhJwt.verifyToken ] , LeadController.updateLead)
}