const request = require('supertest');
const http = require('http');

const { app } = require("../index");
const { getAllEmployees, getEmployeeById } = require('../controllers');

jest.mock('../controllers', () => ({
    ...jest.requireActual('../controllers'),
    getAllEmployees: jest.fn(),
    getEmployeeById: jest.fn()
}));

let server;

beforeAll(async () => {
    server = http.createServer(app);
    server.listen(3001);
});

afterAll(async () => {
    server.close();
});

describe("Controller Function tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all employees", () => {
        let mockedEmployees = [
            {
                employeeId: 1,
                name: "Rahul Sharma", 
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: "Priya Singh", 
                email: "priya.singh@example.com",
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: "Ankit Verma", 
                email: "ankit.verma@example.com",
                departmentId: 1,
                roleId: 3,
            },
        ];

        getAllEmployees.mockReturnValue(mockedEmployees);
        let result = getAllEmployees();
        expect(result).toEqual(mockedEmployees);
        expect(result.length).toBe(3);
    });
});

describe("API Endpoint tests", () => {
    it("GET /employees should get all employees", async() => {
        const response = await request(server).get("/employees");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            employees: [
                {
                    employeeId: 1,
                    name: "Rahul Sharma", 
                    email: "rahul.sharma@example.com",
                    departmentId: 1,
                    roleId: 1,
                },
                {
                    employeeId: 2,
                    name: "Priya Singh", 
                    email: "priya.singh@example.com",
                    departmentId: 2,
                    roleId: 2,
                },
                {
                    employeeId: 3,
                    name: "Ankit Verma", 
                    email: "ankit.verma@example.com",
                    departmentId: 1,
                    roleId: 3,
                },
            ]
        });
        expect(response.body.employees.length).toBe(3);
    });

    it("Get /employees/details/:id should get an employee by ID", async () => {
        const response = await request(server).get("/employees/details/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            employee: {
                employeeId: 1,
                name: "Rahul Sharma", 
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
        });
    });

});