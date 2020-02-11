import BookstoreDAO from '../dao/bookstore';

export default class BookstoreController {
    static async apiGetBookstores(req, res) {
        try {
            const bookstores = await BookstoreDAO.getBookstores();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            return res.json(bookstores);
        } catch(error) {
            res.status(500);
            return res.json({error});
        }
    }
}
