import { Router } from 'express';
import BookCtrl from '../controllers/book';

const router = new Router();

router.route('/')
    .get(BookCtrl.apiGetBooks);
router.route('/:bookstoreId/books')
    .get(BookCtrl.apiGetBooksByBookstoreId)
    .post(BookCtrl.apiAddBook);
router.route('/:bookstoreId/books/:bookId')
    .get(BookCtrl.apiGetBookByBookstoreId)
    .put(BookCtrl.apiUpdateBook)
    .delete(BookCtrl.apiDeleteBook);

export default router;
