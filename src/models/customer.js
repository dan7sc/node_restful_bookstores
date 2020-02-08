import Bookstore from '../models/bookstore';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const STRING = db.Sequelize.STRING;
const DATE = db.Sequelize.DATE;

const Customer = sequelize.define('Customer', {
    id: {
        type: INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    firstName: {
        type: STRING(100),
        field: 'first_name',
        allowNull: false
    },
    lastName: {
        type: STRING(100),
        field: 'last_name',
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
    createdAt: {
        type: DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: DATE,
        field: 'updated_at'
    }
}, {
    tableName: 'customer',
    freezeTableName: true
});

Customer.hasOne(Bookstore, {
    foreignKey: 'customerId',
    onDelete: 'cascade'
});

export default Customer;
