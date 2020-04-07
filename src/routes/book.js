import { Router } from 'express';
import BookCtrl from '../controllers/book';

const router = new Router();

router.route('/')
    .get(BookCtrl.apiGetBooks);
router.route('/bookstore/:bookstoreId')
    .get(BookCtrl.apiGetBooksByBookstoreId)
    .post(BookCtrl.apiAddBook);
router.route('/id/:bookId')
    .get(BookCtrl.apiGetBookById)
    .put(BookCtrl.apiUpdateBook)
    .delete(BookCtrl.apiDeleteBook);

export default router;
