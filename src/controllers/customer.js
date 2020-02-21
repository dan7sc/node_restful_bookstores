import CustomerDAO from '../dao/customer';

export default class CustomerController {
   static async apiAddCustomer(req, res) {
        const data = req.body;
        try {
            const newCustomer = await CustomerDAO.addCustomer(data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(newCustomer);
            return newCustomer;
        } catch (error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }

    static async apiGetCustomerById(req, res) {
        const id = req.params.customerId;
        try {
            const customer = await CustomerDAO.getCustomerById(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(customer);
            return customer;
        }
        catch (error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }

    static async apiDeleteCustomer(req, res) {
        const id = req.params.customerId;
        try {
            const deletedCustomer = await CustomerDAO.deleteCustomer(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedCustomer);
            return deletedCustomer;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }
}
