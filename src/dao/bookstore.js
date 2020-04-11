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
            return bookstores;
        }
        catch(e) {
            const error = `Could not get bookstores: ${e}`;
            return { error };
        }
    }

    static async addBookstore(data) {
        try {
            const { name } = { ...data };
            const query = { name };
            const [newBookstore, isCreated] = await Bookstore.findOrCreate({ where: query, defaults: data });
            return [newBookstore.dataValues, isCreated];
        } catch(e) {
            const error = `Could not add bookstore: ${e}`;
            return { error };
        }
    }

    static async getBookstoreById(id) {
        try {
            const options = { id: id };
            const bookstore = await Bookstore.findOne({ where: options });
            return bookstore.dataValues;
        } catch(e) {
            const error = `Could not get bookstore with id ${id}: ${e}`;
            return { error };
        }
    }

    static async updateBookstore(id, data) {
        try {
            const options = { id: id };
            const numberOfUpdatedBookstores = await Bookstore.update(data, { where: options });
            return numberOfUpdatedBookstores;
        } catch(e) {
            const error = `Could not update bookstore: ${e}`;
            return { error };
        }
    }

    static async deleteBookstore(id) {
        try {
            const options = { id: id };
            const numberOfDeletedBookstores = await Bookstore.destroy({ where: options });
            return numberOfDeletedBookstores;
        } catch(e) {
            const error = `Could not delete bookstore: ${e}`;
            return { error };
        }
    }
}
