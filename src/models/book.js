export default (sequelize, DataType) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataType.STRING(150),
            allowNull: false
        },
        author: {
            type: DataType.STRING(150),
            allowNull: false
        },
        genre: {
            type: DataType.STRING(150),
            allowNull: false
        },
        description: {
            type: DataType.STRING(300),
            allowNull: false
        },
        price: {
            type: DataType.FLOAT,
            allowNull: false
        },
        bookstoreId: {
            type: DataType.INTEGER,
            references: {
                model: 'Bookstore',
                key: 'id'
            }
        },
        createdAt: {
            type: DataType.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            field: 'updated_at'
        }
    }, {
        tableName: 'book',
        underscored: true,
        freezeTableName: true
    });

    return Book;
}
