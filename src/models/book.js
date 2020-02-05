import Customer from '../models/customer';
import Bookstore from '../models/bookstore';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const FLOAT = db.Sequelize.FLOAT;
const STRING = db.Sequelize.STRING;
const INITIALLY_IMMEDIATE = db.Sequelize.Deferrable.INITIALLY_IMMEDIATE;

const Book = sequelize.define('book', {
    id: {
        type: INTEGER,
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
    descripttion: {
        type: STRING(300),
        allowNull: false
    },
    price: {
        type: FLOAT,
        allowNull: false
    },
    bookstoreId: {
        type: INTEGER,
        references:{
            model: Bookstore,
            key: 'id',
            deferrable: INITIALLY_IMMEDIATE,
        }
    },
    customerId: {
        type: INTEGER,
        references:{
            model: Customer,
            key: 'id',
            deferrable: INITIALLY_IMMEDIATE,
        }
    }
});

Book.associate = (models) => {
    Book.belongsTo(models.Bookstore);
};

export default Book;
