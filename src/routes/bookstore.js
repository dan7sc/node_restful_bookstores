import { Router } from 'express';
import BookstoreCtrl from '../controllers/bookstore';
import jwtAuth from '../auth/jwtAuth';

const router = new Router();

router.route('/')
    .get(BookstoreCtrl.apiGetBookstores);
router.route('/new')
    .all(jwtAuth.authenticate())
    .post(BookstoreCtrl.apiAddBookstore);
router.route('/id/:bookstoreId')
    .get(BookstoreCtrl.apiGetBookstoreById)
    .all(jwtAuth.authenticate())
    .put(BookstoreCtrl.apiUpdateBookstore)
    .delete(BookstoreCtrl.apiDeleteBookstore);

export default router;
