import { Router } from 'express';
import BookCtrl from '../controllers/book';

const router = new Router();

router.route('/')
    .get(BookCtrl.apiGetBooks);

export default router;
