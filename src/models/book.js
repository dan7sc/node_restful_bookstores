import Bookstore from '../models/bookstore';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const FLOAT = db.Sequelize.FLOAT;
const STRING = db.Sequelize.STRING;
const DATE = db.Sequelize.DATE;
const INITIALLY_IMMEDIATE = db.Sequelize.Deferrable.INITIALLY_IMMEDIATE;

const Book = sequelize.define('Book', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: STRING(150),
        allowNull: false
    },
    author: {
        type: STRING(150),
        allowNull: false
    },
    genre: {
        type: STRING(150),
        allowNull: false
    },
    description: {
        type: STRING(300),
        allowNull: false
    },
    price: {
        type: FLOAT,
        allowNull: false
    },
    bookstoreId: {
        type: INTEGER,
        field: 'bookstore_id',
        references:{
            model: Bookstore,
            key: 'id',
            deferrable: INITIALLY_IMMEDIATE
        }
    },
    createdAt: {
        type: DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DATE,
        field: 'updated_at'
    }
}, {
    tableName: 'book',
    freezeTableName: true
});

export default Book;
