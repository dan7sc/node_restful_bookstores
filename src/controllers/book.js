import BookDAO from '../dao/book';

export default class BookController {
    static async apiGetBooks(req, res) {
        try {
            const books = await BookDAO.getBooks();
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(books);
            return books;
        } catch(e) {
            const error = `Error getting books: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }

    static async apiGetBooksByBookstoreId(req, res) {
        try {
            const bookstoreId = req.params.bookstoreId;
            const books = await BookDAO.getBooksByBookstoreId(bookstoreId);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(books);
            return books;
        } catch(e) {
            const error = `Error getting books from bookstore: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }

    static async apiGetBookByBookstoreId(req, res) {
        try {
            const bookstoreId = req.params.bookstoreId;
            const bookId = req.params.bookId;
            const book = await BookDAO.getBookByBookstoreId(bookstoreId, bookId);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(book);
            return book;
        } catch(e) {
            const error = `Error getting book by bookstore: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }

    static async apiGetBookById(req, res) {
        try {
            const bookId = req.params.bookId;
            const book = await BookDAO.getBookById(bookId);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(book);
            return book;
        } catch(e) {
            const error = `Error getting book by id: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }


    static async apiAddBook(req, res) {
        try {
            const data = req.body;
            const newBook = await BookDAO.addBook(data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(newBook);
            return newBook;
        } catch(e) {
            const error = `Error adding book: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }

    static async apiUpdateBook(req, res) {
        try {
            const data = req.body;
            const id = req.params.bookId;
            const updatedBook = await BookDAO.updateBook(id, data);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedBook);
            return updatedBook;
        } catch(e) {
            const error = `Error updating book data: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }

    static async apiDeleteBook(req, res) {
        try {
            const id = req.params.bookId;
            const deletedBook = await BookDAO.deleteBook(id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(deletedBook);
            return deletedBook;
        } catch(e) {
            const error = `Error deleting book: ${e}`;
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Type', 'application/json');
            res.json({ error });
            return error;
        }
    }
}
