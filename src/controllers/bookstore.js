import BookstoreDAO from '../dao/bookstore';

export default class BookstoreController {
    static async apiGetBookstores(req, res) {
        try {
            const bookstores = await BookstoreDAO.getBookstores();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({ bookstores });
        } catch(e) {
            const error = `Error getting bookstores: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiAddBookstore(req, res) {
        let response;
        const data = req.body;
        const customerId = req.user.id;
        data.customerId = customerId;
        try {
            const [newBookstore, isCreated] = await BookstoreDAO.addBookstore(data);
            if (isCreated) {
                res.status(200);
                response = `New bookstore ${newBookstore.name} is created`;
            } else {
                res.status(400);
                response = `Bookstore ${newBookstore.name} already exists`;
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
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
            res.json({ bookstore });
        }
        catch (e) {
            const error = `Error getting bookstore by id: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiUpdateBookstore(req, res) {
        let response;
        const data = req.body;
        const id = req.params.bookstoreId;
        const customerId = req.user.id;
        try {
            const bookstore = await BookstoreDAO.getBookstoreById(id);
            if (bookstore && bookstore.customerId === customerId) {
                res.status(200);
                const numberOfUpdatedBookstores = await BookstoreDAO.updateBookstore(id, data);
                response = `${numberOfUpdatedBookstores} bookstores updated: ${bookstore.name} updated`;
            } else {
                res.status(400);
                response = 'Not authorized to update this bookstore data';
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        } catch(e) {
            const error = `Error updating bookstore data: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiDeleteBookstore(req, res) {
        let response;
        const id = req.params.bookstoreId;
        const customerId = req.user.id;
        try {
            const bookstore = await BookstoreDAO.getBookstoreById(id);
            if (bookstore && bookstore.customerId === customerId ) {
                res.status(200);
                const numberOfDeletedBookstores = await BookstoreDAO.deleteBookstore(id);
                response = `${numberOfDeletedBookstores} bookstores deleted: ${bookstore.name} deleted`;
            } else {
                res.status(400);
                response = 'Not authorized to delete this bookstore';
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        } catch(e) {
            const error = `Error deleting bookstore: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }
}
