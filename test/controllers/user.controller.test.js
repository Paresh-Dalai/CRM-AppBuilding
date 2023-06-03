

const db = require('./../db');
const User = require('./../../Models/Users')
const {getAllUsers,getUserById,updateUserDetails} = require('./../../Controller/User.controller')
const {mockRequest,mockResponse} = require("./../interceptor")

const userTestPayload = {
    userId: "1",
    name: "Test",
    userType: "CUSTOMER",
    email: "test@gmail.com",
    userStatus: "APROVED",
  
}

describe("FindAll", () => {

    it("Should pass and return users", async () => {
          
        const userSpy = jest.spyOn(User , 'find').mockReturnValue(Promise.resolve([userTestPayload]))
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}

        await getAllUsers (req,res)

        expect (userSpy).toHaveBeenCalled()
        expect (res.status).toHaveBeenCalledWith(200)
        expect (res.send).toHaveBeenCalledWith([userTestPayload])
    })

    it("Should fail", async () => {

        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();

        req.query = {}
        await getAllUsers (req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("error occured...");
        
    })
})


describe("FindById", () => {

    it("Should pass and return the user", async () => {
        const userSpy = jest.spyOn(User , 'find').mockReturnValue(Promise.resolve([userTestPayload]))
        const req = mockRequest();
        const res = mockResponse();
        req.params = {userId : 1}

        await getUserById (req,res)

        expect (userSpy).toHaveBeenCalled()
        expect (res.status).toHaveBeenCalledWith(200)
        expect (res.send).toHaveBeenCalledWith([userTestPayload])
    })

    it("Should fail", async () => {
        
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve(null));
        const req = mockRequest();
        const res = mockResponse();

        req.params = {userId : 2}
        await getUserById (req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith("No User found with entered userId..");
    })
})


describe("Update", () => {

    it("Should pass and return the updated user", async () => {

        const userSpy = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(()=>({
            exec: jest.fn().mockReturnValue(userTestPayload)
            }))

            const req = mockRequest();
            const res = mockResponse();

            req.params = {userId:1};
            req.body = userTestPayload;

            await updateUserDetails (req, res);

            expect(userSpy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
            message: 'User updated successfully'
            });
            
    })

    it("Should fail", async () => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate').mockReturnValue(cb =>
            cb(new Error("Some internal server error occured"), null));
        const req = mockRequest();
        const res = mockResponse();

        req.params = {userId : 2}
        await updateUserDetails (req, res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message: "Some internal server error occured"});
    })
})