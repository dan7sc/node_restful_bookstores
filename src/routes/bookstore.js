import { Router } from 'express';
import BookstoreCtrl from '../controllers/bookstore';

const router = new Router();

router.route('/')
    .get(BookstoreCtrl.apiGetBookstores)
    .post(BookstoreCtrl.apiAddBookstore);
router.route('/:bookstoreId')
    .get(BookstoreCtrl.apiGetBookstoreById)
    .put(BookstoreCtrl.apiUpdateBookstore)
    .delete(BookstoreCtrl.apiDeleteBookstore);

export default router;
