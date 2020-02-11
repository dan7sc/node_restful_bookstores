import BookstoreDAO from '../dao/bookstore';

export default class BookstoreController {
    static async apiGetBookstores(req, res) {
        const bookstoresList = await BookstoreDAO.getBookstores();
        return res.json(bookstoresList);
    }
}
