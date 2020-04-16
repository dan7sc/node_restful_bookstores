import { Router } from 'express';
import CustomerCtrl from '../controllers/customer';
import localAuth from '../auth/localAuth';
import jwtAuth from '../auth/jwtAuth';

const router = new Router();

router.route('/signup')
    .post(CustomerCtrl.apiAddCustomer);
router.route('/login')
    .all(localAuth.authenticate())
    .post(CustomerCtrl.apiGetToken);
router.route('/logout')
    .all(jwtAuth.authenticate())
    .delete(CustomerCtrl.apiDeleteToken);
router.route('/id/:customerId')
    .all(jwtAuth.authenticate())
    .get(CustomerCtrl.apiGetCustomerById)
    .delete(CustomerCtrl.apiDeleteCustomer);

export default router;
