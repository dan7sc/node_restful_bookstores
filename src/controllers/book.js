import BookDAO from '../dao/book';
import BookstoreDAO from '../dao/bookstore';

export default class BookController {
    static async apiGetBooks(req, res) {
        try {
            const books = await BookDAO.getBooks();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(books);
        } catch(e) {
            const error = `Error getting books: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiGetBooksByBookstoreId(req, res) {
        try {
            const bookstoreId = req.params.bookstoreId;
            const books = await BookDAO.getBooksByBookstoreId(bookstoreId);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(books);
        } catch(e) {
            const error = `Error getting books from bookstore: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiGetBookById(req, res) {
        try {
            const bookId = req.params.bookId;
            const book = await BookDAO.getBookById(bookId);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(book);
        } catch(e) {
            const error = `Error getting book by id: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiAddBook(req, res) {
        let response;
        const data = req.body;
        const bookstoreId = req.params.bookstoreId;
        const customerId = req.user.id;
        data.bookstoreId = bookstoreId;
        try {
            const isOwner = await currentCustomerIsOwnerOfBookstore(customerId, bookstoreId);
            if (isOwner) {
                const [newBook, isCreated] = await BookDAO.addBook(data);
                if (isCreated) {
                    res.status(200);
                    response = `Book ${newBook.title} is added`;
                } else {
                    res.status(400);
                    response = `Book ${newBook.title} with same data already exists`;
                }
            } else {
                res.status(400);
                response = `Not authorized to add book for this bookstore`;
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
        } catch(e) {
            const error = `Error adding book: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiUpdateBook(req, res) {
        let response;
        const data = req.body;
        const bookId = req.params.bookId;
        const customerId = req.user.id;
        try {
            const { books } = await BookDAO.getBookById(bookId);
            const { bookstoreId } = { ...books.dataValues } ;
            const isOwner = await currentCustomerIsOwnerOfBookstore(customerId, bookstoreId);
            if (isOwner) {
                const numberOfUpdatedBooks = await BookDAO.updateBook(bookId, data);
                res.status(200);
                response = `${numberOfUpdatedBooks} books updated`;
            } else {
                res.status(400);
                response = `Not authorized to update this book data`;
            }
            res.setHeader('Content-Type', 'application/json');
            res.json({ response });
        } catch(e) {
            const error = `Error updating book data: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }

    static async apiDeleteBook(req, res) {
        try {
            const id = req.params.bookId;
            const deletedBook = await BookDAO.deleteBook(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedBook);
        } catch(e) {
            const error = `Error deleting book: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
        }
    }
}

const currentCustomerIsOwnerOfBookstore = async (currentCustomerId, bookstoreId) => {
    const { customerId } = await BookstoreDAO.getBookstoreById(bookstoreId);
    const isOwner = customerId === currentCustomerId;
    return isOwner;
};
