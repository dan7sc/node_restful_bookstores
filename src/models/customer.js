import Bookstore from '../models/bookstore';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const STRING = db.Sequelize.STRING;
const DATE = db.Sequelize.DATE;

const Customer = sequelize.define('customer', {
    id: {
        type: INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    firstName: {
        type: STRING(100),
        allowNull: false
    },
    lastName: {
        type: STRING(100),
        allowNull: false
    },
    email: {
        type: STRING(150),
        allowNull: false
    },
    picture: {
        type: STRING(250),
        allowNull: true
    },
    createdAt: DATE,
    updatedAt: DATE
}, {
    freezeTableName: true
});

Customer.hasMany(Bookstore, {
    foreignKey: 'customer_id',
    onDelete: 'cascade'
});

export default Customer;
