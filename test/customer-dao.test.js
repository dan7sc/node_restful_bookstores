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

    describe('should add a customer', () => {
        test('customer not registered', async () => {
            const customerToAdd = {
                id: '9f933f19-d3c6-4fa1-a161-0a2a052fdc66',
                firstName: 'Carlos',
                lastName: 'Chaplin',
                username: 'carlitos',
                password: 'carchap',
                email: 'carlitos@fake.com',
                picture: 'carlitos_image.png'
            };
            const [addedCustomer, isCreated] = await CustomerDAO.addCustomer(customerToAdd);
            expect(addedCustomer.firstName).toEqual(customerToAdd.firstName);
            expect(addedCustomer.lastName).toEqual(customerToAdd.lastName);
            expect(addedCustomer.username).toEqual(customerToAdd.username);
            expect(addedCustomer.email).toEqual(customerToAdd.email);
            expect(addedCustomer.picture).toEqual(customerToAdd.picture);
            expect(isCreated).toEqual(true);
        });

        test('customer with email already registered', async () => {
            const customerToAdd = {
                firstName: 'Alpha',
                lastName: 'Omega',
                username: 'alpha',
                password: 'alpha12345',
                email: 'carlitos@fake.com',
                picture: 'alpha_image.png'
            };
            const [addedCustomer, isCreated] = await CustomerDAO.addCustomer(customerToAdd);
            expect(addedCustomer.firstName).not.toEqual(customerToAdd.firstName);
            expect(addedCustomer.lastName).not.toEqual(customerToAdd.lastName);
            expect(addedCustomer.username).not.toEqual(customerToAdd.username);
            expect(addedCustomer.email).toEqual(customerToAdd.email);
            expect(addedCustomer.picture).not.toEqual(customerToAdd.picture);
            expect(isCreated).toEqual(false);
        });

        test('customer with username already registered', async () => {
            const customerToAdd = {
                firstName: 'Alpha',
                lastName: 'Omega',
                username: 'carlitos',
                password: 'alpha12345',
                email: 'alpha@fake.com',
                picture: 'alpha_image.png'
            };
            const [addedCustomer, isCreated] = await CustomerDAO.addCustomer(customerToAdd);
            expect(addedCustomer.firstName).not.toEqual(customerToAdd.firstName);
            expect(addedCustomer.lastName).not.toEqual(customerToAdd.lastName);
            expect(addedCustomer.username).toEqual(customerToAdd.username);
            expect(addedCustomer.email).not.toEqual(customerToAdd.email);
            expect(addedCustomer.picture).not.toEqual(customerToAdd.picture);
            expect(isCreated).toEqual(false);
        });

        test('customer with email and username already registered', async () => {
            const customerToAdd = {
                firstName: 'Alpha',
                lastName: 'Omega',
                username: 'carlitos',
                password: 'alpha12345',
                email: 'carlitos@fake.com',
                picture: 'alpha_image.png'
            };
            const [addedCustomer, isCreated] = await CustomerDAO.addCustomer(customerToAdd);
            expect(addedCustomer.firstName).not.toEqual(customerToAdd.firstName);
            expect(addedCustomer.lastName).not.toEqual(customerToAdd.lastName);
            expect(addedCustomer.username).toEqual(customerToAdd.username);
            expect(addedCustomer.email).toEqual(customerToAdd.email);
            expect(addedCustomer.picture).not.toEqual(customerToAdd.picture);
            expect(isCreated).toEqual(false);
        });
    });

    test('should delete customer', async () => {
        const customerId = '9f933f19-d3c6-4fa1-a161-0a2a052fdc66';
        const numberOfDeletedCustomer = await CustomerDAO.deleteCustomer(customerId);
        const customer = await CustomerDAO.getCustomerById(customerId);
        expect(numberOfDeletedCustomer).toBe(1);
        expect(customer).toEqual(null);
    });

    test('should get customer by email', async () => {
        const email = 'dansan@fake.com';
        const customer = await CustomerDAO.getCustomerByEmail(email);
        expect(customer.firstName).toEqual('Daniel');
        expect(customer.lastName).toEqual('Santiago');
        expect(customer.email).toEqual('dansan@fake.com');
        expect(customer.length).toBe(undefined);
    });
});
