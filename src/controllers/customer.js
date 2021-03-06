import CustomerDAO from '../dao/customer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class CustomerController {
    static async apiAddCustomer(req, res) {
        let response;
        const { password, ...data } = req.body;
        data.password = await hashPassword(password);
        try {
            const [newCustomer, isCreated] = await CustomerDAO.addCustomer(data);
            delete newCustomer.password;
            if (isCreated) {
                res.status(200);
                response = `Customer with username ${newCustomer.username} is registered`;
            } else {
                res.status(400);
                const { email, username } = { ...newCustomer };
                if (email === data.email && username !== data.username)
                    response = 'Email is already registered';
                else if (username === data.username && email !== data.email)
                    response = 'Username is already registered';
                else
                    response = 'Email and username are already registered';
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
        } catch (e) {
            const error = `Error creating customer account: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiGetCustomerById(req, res) {
        const customerId = req.params.customerId;
        const currentId = req.user.id;
        let response;
        try {
            if (currentId === customerId) {
                res.status(200);
                const customer = await CustomerDAO.getCustomerById(customerId);
                delete customer.password;
                response = customer;
            } else {
                res.status(400);
                response = 'Unauthorized';
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
        }
        catch (e) {
            const error = `Error getting customer by id: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiDeleteCustomer(req, res) {
        const customerId = req.params.customerId;
        const currentId = req.user.id;
        let response;
        try {
            if (currentId === customerId) {
                res.status(200);
                response = await CustomerDAO.deleteCustomer(customerId);
            } else {
                res.status(400);
                response = 'Customer could not be deleted';
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
        } catch(e) {
            const error = `Error deleting customer: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiVerifyPassword(email, password) {
        try {
            const customer = await CustomerDAO.getCustomerByEmail(email);
            const hash = customer.password;
            const isPassword = await verifyPassword(password, hash);
            delete customer.password;
            return { customer, isPassword };
        } catch(e) {
            const error = `Error verifing password: ${e}`;
            return { error };
        }
    }

    static async apiGetCustomerByEmail(email) {
        try {
            const customer = await CustomerDAO.getCustomerByEmail(email);
            return { customer };
        } catch(e) {
            const error = `Error getting customer by email: ${e}`;
            return { error };
        }
    }

    static async apiGetToken(req, res) {
        const payload = { email: req.body.email};
        const secretKey = process.env.TOKEN_SECRET_KEY;
        const options = { expiresIn: 1200 };
        try {
            const token = jwt.sign(payload, secretKey, options);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({ token });
        } catch(e) {
            const error = `Error getting token: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiDeleteToken(req, res) {
        const payload = { email: req.user.email};
        const secretKey = process.env.TOKEN_SECRET_KEY;
        const options = { expiresIn: 0 };
        let response;
        try {
            if (req.user) {
                res.status(200);
                const token = jwt.sign(payload, secretKey, options);
                response = token;
            } else {
                res.status(400);
                response = 'Customer not logged';
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
        } catch(e) {
            const error = `Error deleting token: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }
}

const hashPassword = async (password) => {
    const saltRound = 11;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
};

const verifyPassword = async (password, hash) => {
    const isPassword = await bcrypt.compare(password, hash);
    return isPassword;
};
