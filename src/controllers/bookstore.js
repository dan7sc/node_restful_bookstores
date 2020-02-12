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

    static async apiDeleteBookstores(req, res) {
        try {
            const deletedBookstores = await BookstoreDAO.deleteBookstores();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            return res.json(deletedBookstores);
        } catch(error) {
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

     static async apiUpdateBookstore(req, res) {
        const data = req.body;
        const id = req.params.bookstoreId;
        try {
            const updatedBookstore = await BookstoreDAO.updateBookstore(id, data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            return res.json(updatedBookstore);
        } catch(error) {
            res.status(500);
            return res.json({error});
        }
    }

    static async apiDeleteBookstore(req, res) {
        const id = req.params.bookstoreId;
        try {
            const deletedBookstore = await BookstoreDAO.deleteBookstore(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            return res.json(deletedBookstore);
        } catch(error) {
            res.status(500);
            return res.json({error});
        }
    }
}
