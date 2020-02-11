import { Router } from 'express';
import BookstoreCtrl from '../controllers/bookstore';

const router = new Router();

router.route('/').get(BookstoreCtrl.apiGetBookstores);

export default router;
