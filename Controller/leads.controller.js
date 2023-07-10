



const Leads = require("./../Models/Leads");
const Constants = require("./../utils/Constants/constants");
const Users = require("./../Models/Users")


const createLead = async (req,res) => {
     
    const Lead = {
        
        name: req.body.name,
        Contact: req.body.Contact,
        Address: req.body.Address,
        Gender: req.body.Gender,
        Email : req.body.Email
    }

try{
    if (Lead) {
        await Leads.create(Lead)
        res.send("A Lead was added successfully...").status(200)
    } else if(!Lead){
        res.send("some error occured...").status(400)
    }

}catch(error){
    console.log("error occured in leadsCreation..." + error)
}
    
}

const getAllLeads = async (req,res) => {
     
    try{
        let user = await Users.findOne({userId : req.userId})
    let allLeads;

    if(user && user.userType == Constants.userTypes.sales_rep){
         allLeads = await Leads.find();
    }

    if (allLeads.length) return res.status(200).send(allLeads);
          else return res.status(200).send("No Leads found");

    } catch(error){
        console.log("error occured while fetching Leads..." + error)
    }
    
}

const getLeadById =  async (req,res) => {
      
    let enteredLeadId = req.params.leadId;

    try{

        if(!enteredLeadId) {
            res.send("please enter a valid LeadId...").status(200)
        } 
        if (enteredLeadId) {
           let foundLead = await Leads.find({ _id : enteredLeadId})
            res.send(foundLead).status(200)
        }

    }catch (error) {
        console.log("some error occured while fetching Leads By Id..." + error)
    }
    

}

const updateLead = async (req,res) => {

    // logic -- Ticket can only be updated by the customer who has created it...

    const Lead = await Leads.findOne({_id: req.params.leadId})
    const ourUsers = await Users.findOne({userId : req.userId})

    if(Lead && ourUsers.userType == Constants.userTypes.admin || Constants.userTypes.sales_rep){
        //Allowed to update
        Lead.Contact = req.body.Contact != undefined ? req.body.Contact : Lead.title,
        Lead.Email = req.body.Email != undefined ? req.body.Email: Lead.Email,
        Lead.Address = req.body.Address != undefined ? req.body.Address : Lead.Address

        var updatedLead = await Lead.save()

        return res.status(200).send(updatedLead)
    }else{
        res.status(401).send({
            message: "Lead can only be updated by the sales_rep."
        })
    }

}



module.exports = {createLead , getAllLeads , getLeadById , updateLead}