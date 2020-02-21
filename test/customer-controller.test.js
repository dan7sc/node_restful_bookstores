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

    test('should add customer', async () => {
        const body = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66',
            firstName: 'Test',
            lastName: 'Silva',
            email: 'test@fake.com',
            picture: 'test_customer_image.png'
        };
        const req = mockRequest(null, body);
        const res = mockResponse();
        const addedCustomer = await CustomerCtrl.apiAddCustomer(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/json");
        expect(addedCustomer.id).toEqual(body.id);
        expect(addedCustomer.firstName).toEqual(body.firstName);
        expect(addedCustomer.lastName).toEqual(body.lastName);
        expect(addedCustomer.picture).toEqual(body.picture);
        expect(addedCustomer.email).toEqual(body.email);
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
});
