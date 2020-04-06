import BookstoreDAO from '../dao/bookstore';

export default class BookstoreController {
    static async apiGetBookstores(req, res) {
        try {
            const bookstores = await BookstoreDAO.getBookstores();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(bookstores);
        } catch(e) {
            const error = `Error getting bookstores: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

   static async apiAddBookstore(req, res) {
        const data = req.body;
        try {
            const newBookstore = await BookstoreDAO.addBookstore(data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(newBookstore);
        } catch (e) {
            const error = `Error adding bookstore: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiGetBookstoreById(req, res) {
        const id = req.params.bookstoreId;
        try {
            const bookstore = await BookstoreDAO.getBookstoreById(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(bookstore);
        }
        catch (e) {
            const error = `Error getting bookstore by id: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

     static async apiUpdateBookstore(req, res) {
        const data = req.body;
        const id = req.params.bookstoreId;
        try {
            const updatedBookstore = await BookstoreDAO.updateBookstore(id, data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedBookstore);
        } catch(e) {
            const error = `Error updating bookstore data: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiDeleteBookstore(req, res) {
        const id = req.params.bookstoreId;
        try {
            const deletedBookstore = await BookstoreDAO.deleteBookstore(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedBookstore);
        } catch(e) {
            const error = `Error deleting bookstore: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }
}
