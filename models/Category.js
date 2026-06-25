const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Category = sequelize.define('Category', {
    id_Catégorie: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_Catégorie: {
        type: DataTypes.STRING(45),
        unique: true,
    },
}, {
    tableName: 'Catégories',
    timestamps: false,
});

module.exports = Category;
