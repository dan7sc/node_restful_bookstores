import BookstoreDAO from '../dao/bookstore';

export default class BookstoreController {
    static async apiGetBookstores(req, res) {
        try {
            const bookstores = await BookstoreDAO.getBookstores();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(bookstores);
            return bookstores;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }

    static async apiDeleteBookstores(req, res) {
        try {
            const deletedBookstores = await BookstoreDAO.deleteBookstores();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedBookstores);
            return deletedBookstores;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }

   static async apiAddBookstore(req, res) {
        const data = req.body;
        try {
            const newBookstore = await BookstoreDAO.addBookstore(data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(newBookstore);
            return newBookstore;
        } catch (error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }

    static async apiGetBookstoreById(req, res) {
        const id = req.params.bookstoreId;
        try {
            const bookstore = await BookstoreDAO.getBookstoreById(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(bookstore);
            return bookstore;
        }
        catch (error) {
            res.status(500);
            res.json({error});
            return error;
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
            return updatedBookstore;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }

    static async apiDeleteBookstore(req, res) {
        const id = req.params.bookstoreId;
        try {
            const deletedBookstore = await BookstoreDAO.deleteBookstore(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedBookstore);
            return deletedBookstore;
        } catch(error) {
            res.status(500);
            res.json({error});
            return error;
        }
    }
}
