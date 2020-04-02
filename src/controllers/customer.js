import CustomerDAO from '../dao/customer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class CustomerController {
   static async apiAddCustomer(req, res) {
       let response;
       const { password, ...data } = req.body;
       data.password = await hashPassword(password);
       try {
            const [result, isCreated] = await CustomerDAO.addCustomer(data);
            if (isCreated) {
                res.status(200);
                const { firstName, lastName, picture, username, email } = { ...result.dataValues };
                const newCustomer = { firstName, lastName, picture, username, email };
                response = {message: newCustomer};
            } else {
                res.status(400);
                const { email, username } = { ...result.dataValues };
                if (email === data.email && username !== data.username)
                    response = { message: 'Email is already registered' };
                else if (username === data.username && email !== data.email)
                    response = { message: 'Username is already registered' };
                else
                    response = { message: 'Email and username are already registered' };
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
            return response;
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

    static async apiVerifyPassword(email, password) {
        try {
            const customer = await CustomerDAO.getCustomerByEmail(email);
            const hash = customer.password;
            const isPassword = await verifyPassword(password, hash);
            return { customer, isPassword };
        } catch(error) {
            return error;
        }
    }

    static async apiGetCustomerByEmail(email) {
        try {
            const customer = await CustomerDAO.getCustomerByEmail(email);
            return customer;
        } catch(error) {
            return error;
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
            res.json({token});
            return token;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
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
