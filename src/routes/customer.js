import { Router } from 'express';
import CustomerCtrl from '../controllers/customer';
import localAuth from '../auth/localAuth';

const router = new Router();

router.route('/signup')
    .post(CustomerCtrl.apiAddCustomer);
router.route('/:customerId/login')
    .all(localAuth.authenticate())
    .post(CustomerCtrl.apiGetToken);
router.route('/:customerId')
    .get(CustomerCtrl.apiGetCustomerById)
    .delete(CustomerCtrl.apiDeleteCustomer);

export default router;
