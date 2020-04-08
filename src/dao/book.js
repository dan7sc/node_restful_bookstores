let Book;

export default class BookDAO {
    static async injectDB(conn) {
        try {
            Book = conn.models.Book;
        } catch(e) {
            console.error(`Unable to establish a connection: ${e}`);
        }
    }

    static async getBooks() {
        try {
            const books = await Book.findAll({});
            return { books };
        } catch(e) {
            const error = `Could not get books: ${e}`;
            return { error };
        }
    }

    static async getBooksByBookstoreId(id) {
        try {
            const options = { bookstoreId: id };
            const books = await Book.findAll({ where: options });
            return { books };
        } catch(e) {
            const error = `Could not get books from bookstore: ${e}`;
            return { error };
        }
    }

    static async addBook(data) {
        try {
            const { title, author, genre, description, price, bookstoreId } = { ...data };
            const query = { title, author, genre, description, price, bookstoreId };
            const [newBook, isCreated] = await Book.findOrCreate({ where: query, defaults: data });
            return [newBook, isCreated];
        } catch(e) {
            const error = `Could not add book: ${e}`;
            return { error };
        }
    }

    static async getBookById(id) {
        try {
            const options = { id: id };
            const books = await Book.findOne({ where: options });
            return { books };
        } catch(e) {
            const error = `Could not get books: ${e}`;
            return { error };
        }
    }

    static async updateBook(id, data) {
        try {
            const options = { id: id };
            const updatedBook = await Book.update(data, { where: options });
            return updatedBook;
        } catch(e) {
            const error = `Could not update book: ${e}`;
            return { error };
        }
    }

    static async deleteBook(id) {
        try {
            const options = { id: id };
            const deletedBook = await Book.destroy({ where: options });
            return deletedBook;
        } catch(e) {
            const error = `Could not delete book: ${e}`;
            return { error };
        }
    }
}
