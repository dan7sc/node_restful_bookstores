import Customer from '../models/customer';
import Book from '../models/book';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const STRING = db.Sequelize.STRING;
const DATE = db.Sequelize.DATE;
const INITIALLY_IMMEDIATE = db.Sequelize.Deferrable.INITIALLY_IMMEDIATE;

const Bookstore = sequelize.define('Bookstore', {
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
    customerId: {
        type: INTEGER,
        field: 'customer_id',
        references:{
            model: Customer,
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
    tableName: 'bookstore',
    freezeTableName: true
});

Bookstore.hasOne(Book, {
    foreignKey: 'bookstoreId',
    onDelete: 'cascade'
});

export default Bookstore;
