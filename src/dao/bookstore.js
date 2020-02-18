let Bookstore;

export default class BookstoreDAO {
    static async injectDB(conn) {
        try {
            Bookstore = conn.models.Bookstore;
        }
        catch(error) {
            console.error(`Unable to establish a connection: ${error}`);
        }
    }

    static async getBookstores() {
        try {
            const bookstores = await Bookstore.findAll({});
            return bookstores;
        }
        catch(error) {
            console.error(`Could not get bookstores: ${error}`);
            return error;
        }
    }

    static async addBookstore(data) {
        try {
            const newBookstore = await Bookstore.create(data);
            return newBookstore;
        } catch(error) {
            console.log(`Could not add bookstore: ${error}`);
            return error;
        }
    }

    static async deleteBookstores() {
        try {
            const deletedBookstores = await Bookstore.destroy({ where: {} });
            return deletedBookstores;
        } catch(error) {
            console.log(`Could not delete bookstores: ${error}`);
            return error;
        }
    }

    static async getBookstoreById(id) {
        try {
            const options = { id: id };
            const bookstore = await Bookstore.findOne({ where: options });
            return bookstore;
        } catch(error) {
            console.log(`Could not get bookstore with id ${id}: ${error}`);
            return error;
        }
    }

    static async updateBookstore(id, data) {
        try {
            const options = { id: id };
            const updatedBookstore = await Bookstore.update(data, { where: options });
            return updatedBookstore;
        } catch(error) {
            console.log(`Could not update bookstore: ${error}`);
            return error;
        }
    }

    static async deleteBookstore(id) {
        try {
            const options = { id: id };
            const deletedBookstore = await Bookstore.destroy({ where: options });
            return deletedBookstore;
        } catch(error) {
            console.log(`Could not delete bookstore: ${error}`);
            return error;
        }
    }
 }
