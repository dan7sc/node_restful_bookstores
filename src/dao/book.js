let Book;

export default class BookDAO {
    static async injectDB(conn) {
        try {
            Book = conn.models.Book;
        } catch(error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async getBooks() {
        try {
            const books = await Book.findAll({});
            return books;
        } catch(error) {
            console.error(`Could not get books: ${error}`);
            return error;
        }
    }

    static async addBook(data) {
        try {
            const newBook = await Book.create(data);
            return newBook;
        } catch(error) {
            console.log(`Could not add book: ${error}`);
            return error;
        }
    }

    static async getBookById(id) {
        try {
            const options = { id: id };
            const books = await Book.findOne({ where: options });
            return books;
        } catch(error) {
            console.error(`Could not get books: ${error}`);
            return error;
        }
    }

    static async updateBook(id, data) {
        try {
            const options = { id: id };
            const updatedBook = await Book.update(data, { where: options });
            return updatedBook;
        } catch(error) {
            console.log(`Could not update book: ${error}`);
            return error;
        }
    }

    static async deleteBook(id) {
        try {
            const options = { id: id };
            const deletedBook = await Book.destroy({ where: options });
            return deletedBook;
        } catch(error) {
            console.log(`Could not delete book: ${error}`);
            return error;
        }
    }
}
