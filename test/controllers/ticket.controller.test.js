
const db = require('../db')
const {mockRequest, mockResponse} = require("./../interceptor")
const {createTicket,updateTicket,getAllTickets,getTicketsById} = require('./../../Controller/ticket.controller')
const User = require("./../../Models/Users");
const Ticket = require("../../Models/Tickets");
const client = require("../../utils/Constants/NotificationSend").client;

beforeAll (async () => await db.connect())
afterEach (async () => await db.clearDatabase())
afterAll (async () => await db.closeDatabase())

const userTestPayload = {

    title: "button not working",
    ticketPriority: 1,
    description: "Login Button not working ",
    status: "OPEN",
    reporter: "omkar",

   }
   
 const createTickets = {
    ticketsAssigned: [], ticketsCreated: [], _id: '123456', userId: "Engineer_01",
    save: jest.fn().mockImplementation(() => Promise.resolve("ok"))
 }  
   
   describe("create Ticket" ,  () => {
      
     it("should create successfully" , async () => {
          
        const userSpy = jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve(createTickets));
        // const clientSpy = jest.spyOn(client,'post').mockImplementation(cb => cb("Test" , null));
        // jest.spyOn(client,'post').mockImplementation(() => {});
        let spyCreateTicket = jest.spyOn(Ticket, "create").mockImplementation(() => Promise.resolve({ _id : "123"}))
            const req = mockRequest();
            const res = mockResponse();

            req.body = userTestPayload ;
            req.userId = "paresh_123";

            await createTicket(req, res);

                expect(userSpy).toHaveBeenCalled();
                expect(spyCreateTicket).toHaveBeenCalled();
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.send).toHaveBeenCalledWith("ticket created successfully")
                //    expect.objectContaining({
                //            assignee: 1,
                //            description: "Test",
                //            reporter: 1,
                //            status: "OPEN",
                //            ticketPriority: 4,
                //            title: "Test",
                //          })
 
 
     })

     it("Fails while creating a ticket" , () => {

     })
   })
