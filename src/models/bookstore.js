export default (sequelize, DataType) => {
    const Bookstore = sequelize.define('Bookstore', {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING(150),
            allowNull: false
        },
        picture: {
            type: DataType.STRING(250),
            allowNull: true
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
        tableName: 'bookstore',
        underscored: true,
        freezeTableName: true,
    });

    Bookstore.associate = (models) => {
        Bookstore.hasMany(models.Book, {
            foreignKey: 'bookstoreId',
            onDelete: 'cascade'
        });
    };

    return Bookstore;
};
