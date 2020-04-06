let Bookstore;

export default class BookstoreDAO {
    static async injectDB(conn) {
        try {
            Bookstore = conn.models.Bookstore;
        }
        catch(e) {
            console.error(`Unable to establish a connection: ${e}`);
        }
    }

    static async getBookstores() {
        try {
            const bookstores = await Bookstore.findAll({});
            return { bookstores };
        }
        catch(e) {
            const error = `Could not get bookstores: ${e}`;
            return { error };
        }
    }

    static async addBookstore(data) {
        try {
            const newBookstore = await Bookstore.create(data);
            return newBookstore;
        } catch(e) {
            const error = `Could not add bookstore: ${e}`;
            return { error };
        }
    }

    static async deleteBookstores() {
        try {
            const deletedBookstores = await Bookstore.destroy({ where: {} });
            return deletedBookstores;
        } catch(e) {
            const error = `Could not delete bookstores: ${e}`;
            return { error };
        }
    }

    static async getBookstoreById(id) {
        try {
            const options = { id: id };
            const bookstore = await Bookstore.findOne({ where: options });
            return bookstore;
        } catch(e) {
            const error = `Could not get bookstore with id ${id}: ${e}`;
            return { error };
        }
    }

    static async updateBookstore(id, data) {
        try {
            const options = { id: id };
            const updatedBookstore = await Bookstore.update(data, { where: options });
            return updatedBookstore;
        } catch(e) {
            const error = `Could not update bookstore: ${e}`;
            return { error };
        }
    }

    static async deleteBookstore(id) {
        try {
            const options = { id: id };
            const deletedBookstore = await Bookstore.destroy({ where: options });
            return deletedBookstore;
        } catch(e) {
            const error = `Could not delete bookstore: ${e}`;
            return { error };
        }
    }
 }
