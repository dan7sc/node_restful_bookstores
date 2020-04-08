import { Router } from 'express';
import BookCtrl from '../controllers/book';
import jwtAuth from '../auth/jwtAuth';

const router = new Router();

router.route('/')
    .get(BookCtrl.apiGetBooks);
router.route('/bookstore/:bookstoreId')
    .get(BookCtrl.apiGetBooksByBookstoreId)
    .all(jwtAuth.authenticate())
    .post(BookCtrl.apiAddBook);
router.route('/id/:bookId')
    .get(BookCtrl.apiGetBookById)
    .all(jwtAuth.authenticate())
    .put(BookCtrl.apiUpdateBook)
    .delete(BookCtrl.apiDeleteBook);

export default router;
