import CustomerDAO from '../src/dao/customer';
import CustomerCtrl from '../src/controllers/customer';

jest.mock('express');
const mockRequest = (params, body, user) => {
    const req = {};
    req.params = params;
    req.body = body;
    req.user = user;
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('customer ctrl', () => {
    beforeAll(async () => {
        await CustomerDAO.injectDB(global.appClient);
    });

    test('should get a customer', async () => {
        const params = {
            customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc65'
        };
        const res = mockResponse();
        const req = mockRequest(params, null, user);
        await CustomerCtrl.apiGetCustomerById(req, res);
        const customer = res.json.mock.calls[0][0];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(customer.response.id).toEqual(params.customerId);
        expect(customer.response.firstName).toEqual('Daniel');
        expect(customer.response.lastName).toEqual('Santiago');
        expect(customer.response.email).toEqual('dansan@fake.com');
        expect(customer.response.username).toEqual('daniel');
    });

    describe('should add customer', () => {
        test('customer not registered', async () => {
            const body = {
                id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66',
                firstName: 'Carlos',
                lastName: 'Chaplin',
                password: 'carchap',
                username: 'carlitos',
                email: 'carlitos@fake.com',
                picture: 'carlitos_image.png'
            };
            const response = `Customer with username ${body.username} is registered`;
            const req = mockRequest(null, body, null);
            const res = mockResponse();
            await CustomerCtrl.apiAddCustomer(req, res);
            const addedCustomer = res.json.mock.calls[0][0];
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            //expect(res.json).toHaveBeenCalledWith("firstName", body.firstName);
            expect(addedCustomer.response).toEqual(response);
        });

        test('customer with email already registered', async () => {
            const body = {
                firstName: 'Alpha',
                lastName: 'Omega',
                username: 'alpha',
                password: 'alpha12345',
                email: 'carlitos@fake.com',
                picture: 'alpha_image.png'
            };
            const response = 'Email is already registered';
            const req = mockRequest(null, body, null);
            const res = mockResponse();
            await CustomerCtrl.apiAddCustomer(req, res);
            const addedCustomer = res.json.mock.calls[0][0];
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.response).toEqual(response);
        });

        test('customer with username already registered', async () => {
            const body = {
                firstName: 'Alpha',
                lastName: 'Omega',
                username: 'carlitos',
                password: 'alpha12345',
                email: 'alpha@fake.com',
                picture: 'alpha_image.png'
            };
            const response = 'Username is already registered';
            const req = mockRequest(null, body, null);
            const res = mockResponse();
            await CustomerCtrl.apiAddCustomer(req, res);
            const addedCustomer = res.json.mock.calls[0][0];
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.response).toEqual(response);
        });

        test('customer with email and username already registered', async () => {
            const body = {
                firstName: 'Alpha',
                lastName: 'Omega',
                username: 'carlitos',
                password: 'alpha12345',
                email: 'carlitos@fake.com',
                picture: 'alpha_image.png'
            };
            const response = 'Email and username are already registered';
            const req = mockRequest(null, body, null);
            const res = mockResponse();
            await CustomerCtrl.apiAddCustomer(req, res);
            const addedCustomer = res.json.mock.calls[0][0];
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.response).toEqual(response);
        });
    });

    test('should delete customer', async () => {
        const params = {
            customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66'
        };
        const user = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66'
        };
        const errorMessage = `Could not get customer with id ${params.customerId}: TypeError: Cannot read property 'dataValues' of null`;
        const req = mockRequest(params, null, user);
        const res = mockResponse();
        await CustomerCtrl.apiDeleteCustomer(req, res);
        const numberOfDeletedCustomers = res.json.mock.calls[0][0]['response'];
        const { error } = await CustomerDAO.getCustomerById(params.customerId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedCustomers).toBe(1);
        expect(error).toEqual(errorMessage);
    });

    test('should get token', async () => {
        const body = {
            email: 'dansan@fake.com'
        };
        const req = mockRequest(null, body, null);
        const res = mockResponse();
        await CustomerCtrl.apiGetToken(req, res);
        const token = res.json.mock.calls[0][0]['token'];
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(typeof token).toEqual('string');
        expect(token.length).toBeGreaterThan(70);
    });

    test('should verify password', async () => {
        const email = 'dansan@fake.com';
        const password = 'mysecretpassword';
        const { customer, isPassword } = await CustomerCtrl.apiVerifyPassword(email, password);
        expect(isPassword).toBe(true);
        expect(customer.id).toEqual('9f933f19-d3c6-4fa1-a161-0a2a052fdc65');
        expect(customer.lastName).toEqual('Santiago');
        expect(customer.email).toEqual('dansan@fake.com');
        expect(customer.length).toBe(undefined);
    });

    test('should get a customer by email', async () => {
        const email = 'dansan@fake.com';
        const { customer } = await CustomerCtrl.apiGetCustomerByEmail(email);
        expect(customer.id).toEqual('9f933f19-d3c6-4fa1-a161-0a2a052fdc65');
        expect(customer.lastName).toEqual('Santiago');
        expect(customer.email).toEqual('dansan@fake.com');
    });
});
