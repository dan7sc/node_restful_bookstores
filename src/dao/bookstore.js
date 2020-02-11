const db = {};

export default class BookstoreDAO {
    static async injectDB(conn) {
        // if (bookstores) {
        //     return;
        // }
        try {
            db.conn = await conn;
            // const Bookstore = await db.conn.models.Bookstore;
            // const bookstore = await Bookstore.findOne({})
            //       .then(result => result.get())
            //       .catch(error => console.error(error));
            // console.log(bookstore);
        }
        catch (error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async getBookstores() {
        try {
            const Bookstore = db.conn.models.Bookstore;
            const bookstores = await Bookstore.findAll({})
                  .then(result => result)
                  .catch(error => console.error(error));
            return bookstores;
        }
        catch (error) {
            console.error(`Could not get bookstores: ${error}`);
        }
        return null;
    }
}
