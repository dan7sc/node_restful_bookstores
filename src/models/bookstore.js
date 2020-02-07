import Customer from '../models/customer';
import Book from '../models/book';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const STRING = db.Sequelize.STRING;
const DATE = db.Sequelize.DATE;
const INITIALLY_IMMEDIATE = db.Sequelize.Deferrable.INITIALLY_IMMEDIATE;

const Bookstore = sequelize.define('bookstore', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: STRING(150),
        allowNull: false
    },
    picture: {
        type: STRING(250),
        allowNull: true
    },
    createdAt: DATE,
    updatedAt: DATE,
    customer_id: {
        type: INTEGER,
        references:{
            model: Customer,
            key: 'id',
            deferrable: INITIALLY_IMMEDIATE
        }
    }
}, {
    freezeTableName: true
});

Bookstore.hasMany(Book, {
    foreignKey: 'bookstore_id',
    onDelete: 'cascade'
});

export default Bookstore;
