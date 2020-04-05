let Customer;
let Op;

export default class CustomerDAO {
    static async injectDB(conn) {
        try {
            Customer = conn.models.Customer;
            Op = conn.Sequelize.Op;
        }
        catch(e) {
            console.error(`Unable to establish a connection: ${e}`);
        }
    }

    static async addCustomer(data) {
        try {
            const { email, username } = { ...data };
            const query = { [Op.or]: [{ email }, { username }] };
            const [customer, isCreated] = await Customer.findOrCreate({ where: query, defaults: data });
            return [customer.dataValues, isCreated];
        } catch(e) {
            const error = `Could not add customer: ${e}`;
            return { error };
        }
    }

    static async getCustomerById(id) {
        try {
            const options = { id: id };
            const customer = await Customer.findOne({ where: options });
            return customer.dataValues;
        } catch(e) {
            const error = `Could not get customer with id ${id}: ${e}`;
            return { error };
        }
    }

    static async getCustomerByEmail(email) {
        try {
            const options = { email: email };
            const customer = await Customer.findOne({ where: options });
            return customer.dataValues;
        } catch(e) {
            const error = `Could not get customer with email ${email}: ${e}`;
            return { error };
        }
    }

    static async deleteCustomer(id) {
        try {
            const options = { id: id };
            const numberOfDeletedCustomers = await Customer.destroy({ where: options });
            return numberOfDeletedCustomers;
        } catch(e) {
            const error = `Could not delete customer: ${e}`;
            return { error };
        }
    }
 }
