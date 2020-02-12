import { Router } from 'express';
import BookstoreCtrl from '../controllers/bookstore';

const router = new Router();

router.route('/')
    .get(BookstoreCtrl.apiGetBookstores)
    .post(BookstoreCtrl.apiAddBookstore);
router.route('/:bookstoreId')
    .get(BookstoreCtrl.apiGetBookstoreById);


export default router;
