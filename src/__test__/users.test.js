import request from "supertest";
import {GetUserByID} from "../controller/User/userController.mjs";

const mockRequest = {
    params: {
        id: "6698b7ca6de6fd113e575745"
    }
}

const mockResponse = {
    send: jest.fn(), sendStatus: jest.fn()
}

describe('Test Users', () => {
    it("should get user by id", () => {
        GetUserByID(mockRequest, mockResponse)
        expect(mockResponse.send).not.toHaveBeenCalled();
        expect(mockResponse.send).not.toHaveBeenCalledWith(GetUserByID(mockRequest, mockResponse));
    })
})