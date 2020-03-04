let Customer;

export default class CustomerDAO {
    static async injectDB(conn) {
        try {
            Customer = conn.models.Customer;
        }
        catch(error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async addCustomer(data) {
        try {
            const newCustomer = await Customer.create(data);
            return newCustomer;
        } catch(error) {
            console.log(`Could not add customer: ${error}`);
            return error;
        }
    }

    static async getCustomerById(id) {
        try {
            const options = { id: id };
            const customer = await Customer.findOne({ where: options });
            return customer;
        } catch(error) {
            console.log(`Could not get customer with id ${id}: ${error}`);
            return error;
        }
    }

    static async getCustomerByEmail(email) {
        try {
            const options = { email: email };
            const customer = await Customer.findOne({ where: options });
            return customer;
        } catch(error) {
            console.log(`Could not get customer with email ${email}: ${error}`);
            return error;
        }
    }

    static async deleteCustomer(id) {
        try {
            const options = { id: id };
            const deletedCustomer = await Customer.destroy({ where: options });
            return deletedCustomer;
        } catch(error) {
            console.log(`Could not delete customer: ${error}`);
            return error;
        }
    }
 }
