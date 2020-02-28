import { Router } from 'express';
import CustomerCtrl from '../controllers/customer';

const router = new Router();

router.route('/signup')
    .post(CustomerCtrl.apiAddCustomer);
router.route('/:customerId')
    .get(CustomerCtrl.apiGetCustomerById)
    .delete(CustomerCtrl.apiDeleteCustomer);

export default router;
