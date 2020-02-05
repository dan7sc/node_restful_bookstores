import Customer from '../models/customer';
import db from '../../data/database-setup';
const sequelize = db.sequelize;
const INTEGER = db.Sequelize.INTEGER;
const STRING = db.Sequelize.STRING;
const INITIALLY_IMMEDIATE = db.Sequelize.Deferrable.INITIALLY_IMMEDIATE;

const Bookstore = sequelize.define('bookstore', {
    id: {
        type: INTEGER,
        primaryKey: true
    },
    name: {
        type: STRING(150),
        allowNull: false
    },
    customerId: {
        type: INTEGER,
        references:{
            model: Customer,
            key: 'id',
            deferrable: INITIALLY_IMMEDIATE,
        }
    },
    email: {
        type: STRING(150),
        allowNull: false
    },
    picture: {
        type: STRING(250),
        allowNull: true
    }
});

Bookstore.associate = (models) => {
    Bookstore.belongsTo(models.Customer);
    Bookstore.hasMany(models.Book, {
        onDelete: 'cascade',
        hooks: true
    });
};

export default Bookstore;
