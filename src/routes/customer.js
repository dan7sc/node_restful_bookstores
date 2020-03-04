import { Router } from 'express';
import CustomerCtrl from '../controllers/customer';
import auth from '../auth/auth';

const router = new Router();

router.route('/signup')
    .post(CustomerCtrl.apiAddCustomer);
router.route('/:customerId/login')
    .all(auth.authenticate())
    .post(CustomerCtrl.apiGetToken);
router.route('/:customerId')
    .get(CustomerCtrl.apiGetCustomerById)
    .delete(CustomerCtrl.apiDeleteCustomer);

export default router;
