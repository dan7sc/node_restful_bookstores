import CustomerDAO from '../src/dao/customer';

describe('customer dao', () => {
    beforeAll(async () => {
        await CustomerDAO.injectDB(global.appClient);
    });

    test('should get customer', async () => {
        const customerId = '9f933f19-d3c6-4fa1-a161-0a2a052fdc65';
        const customer = await CustomerDAO.getCustomerById(customerId);
        expect(customer.firstName).toEqual('Daniel');
        expect(customer.lastName).toEqual('Santiago');
        expect(customer.email).toEqual('dansan@fake.com');
        expect(customer.length).toBe(undefined);
    });

    test('should add a customer', async () => {
        const customerToAdd = {
            id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66',
            firstName: 'Carlos',
            lastName: 'Chaplin',
            username: 'carlitos',
            password: 'carchap',
            email: 'carlitos@fake.com',
            picture: 'carlitos_image.png'
        };
        const addedCustomer = await CustomerDAO.addCustomer(customerToAdd);
        expect(addedCustomer.id).toEqual(customerToAdd.id);
        expect(addedCustomer.firstName).toEqual(customerToAdd.firstName);
        expect(addedCustomer.lastName).toEqual(customerToAdd.lastName);
        expect(addedCustomer.email).toEqual(customerToAdd.email);
        expect(addedCustomer.picture).toEqual(customerToAdd.picture);
    });

    test('should delete customer', async () => {
        const customerId = '9f933f19-d3c6-4fa1-a161-0a2a052fdc66';
        const numberOfDeletedCustomer = await CustomerDAO.deleteCustomer(customerId);
        const customer = await CustomerDAO.getCustomerById(customerId);
        expect(numberOfDeletedCustomer).toBe(1);
        expect(customer).toEqual(null);
    });
});
