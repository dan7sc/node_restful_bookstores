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

    static async apiGetBookstoreById(req, res) {
        const id = req.params.bookstoreId;
        try {
            const bookstore = await BookstoreDAO.getBookstoreById(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            return res.json(bookstore);
        }
        catch (error) {
            res.status(500);
            return res.json({error});
        }
    }

    static async apiAddBookstore(req, res) {
        const data = req.body;
        try {
            const newBookstore = await BookstoreDAO.addBookstore(data);
            res.status(200);
            res.setHeader('Content-Type', 'appication/json');
            return res.json(newBookstore);
        } catch (error) {
            res.status(500);
            return res.json({error});
        }
    }
}
