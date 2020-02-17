const db = {};

export default class BookDAO {
    static async injectDB(conn) {
        try {
            db.conn = conn;
        } catch(error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async getBooks() {
        try {
            const Book = db.conn.models.Book;
            const books = await Book.findAll({});
            return books;
        } catch(error) {
            console.error(`Could not get books: ${error}`);
            return error;
        }
    }
}
