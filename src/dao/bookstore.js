const db = {};

export default class BookstoreDAO {
    static async injectDB(conn) {
        try {
            db.conn = await conn;
        }
        catch (error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async getBookstores() {
        try {
            const Bookstore = db.conn.models.Bookstore;
            const bookstores = await Bookstore.findAll({});
            return bookstores;
        }
        catch (error) {
            console.error(`Could not get bookstores: ${error}`);
        }
        return null;
    }
}
