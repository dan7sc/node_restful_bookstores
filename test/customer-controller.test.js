import CustomerDAO from '../src/dao/customer';
import CustomerCtrl from '../src/controllers/customer';

jest.mock('express');
const mockRequest = (params, body) => {
    const req = {};
    req.params = params;
    req.body = body;
    return req;
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue();
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
        const res = mockResponse();
        const req = mockRequest(params, null);
        const customer = await CustomerCtrl.apiGetCustomerById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(customer.id).toEqual(params.customerId);
        expect(customer.lastName).toEqual('Santiago');
        expect(customer.email).toEqual('dansan@fake.com');
        expect(customer.length).toBe(undefined);
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
            const req = mockRequest(null, body);
            const res = mockResponse();
            const addedCustomer = await CustomerCtrl.apiAddCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.message.firstName).toEqual(body.firstName);
            expect(addedCustomer.message.lastName).toEqual(body.lastName);
            expect(addedCustomer.message.picture).toEqual(body.picture);
            expect(addedCustomer.message.username).toEqual(body.username);
            expect(addedCustomer.message.email).toEqual(body.email);
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
            const message = 'Email is already registered';
            const req = mockRequest(null, body);
            const res = mockResponse();
            const addedCustomer = await CustomerCtrl.apiAddCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.message).toEqual(message);
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
            const message = 'Username is already registered';
            const req = mockRequest(null, body);
            const res = mockResponse();
            const addedCustomer = await CustomerCtrl.apiAddCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.message).toEqual(message);
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
            const message = 'Email and username are already registered';
            const req = mockRequest(null, body);
            const res = mockResponse();
            const addedCustomer = await CustomerCtrl.apiAddCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
            expect(addedCustomer.message).toEqual(message);
        });
    });

    test('should delete customer', async () => {
        const params = {
            customerId: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66'
        };
        const req = mockRequest(params, null);
        const res = mockResponse();
        const numberOfDeletedCustomers = await CustomerCtrl.apiDeleteCustomer(req, res);
        const customer = await CustomerDAO.getCustomerById(params.customerId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(numberOfDeletedCustomers).toBe(1);
        expect(customer).toEqual(null);
    });

    test('should get token', async () => {
        const body = {
            email: 'dansan@fake.com'
        };
        const req = mockRequest(null, body);
        const res = mockResponse();
        const token = await CustomerCtrl.apiGetToken(req, res);
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
        const customer = await CustomerCtrl.apiGetCustomerByEmail(email);
        expect(customer.id).toEqual('9f933f19-d3c6-4fa1-a161-0a2a052fdc65');
        expect(customer.lastName).toEqual('Santiago');
        expect(customer.email).toEqual('dansan@fake.com');
    });
});
