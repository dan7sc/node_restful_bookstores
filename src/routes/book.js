import { Router } from 'express';
import BookCtrl from '../controllers/book';

const router = new Router();

router.route('/')
    .get(BookCtrl.apiGetBooks);
router.route('/:bookstoreId/books')
    .get(BookCtrl.apiGetBooksByBookstoreId);

export default router;
