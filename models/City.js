const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const City = sequelize.define('City', {
    id_Ville: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_Ville: {
        type: DataTypes.STRING(45),
        unique: true,
    },
}, {
    tableName: 'Villes',
    timestamps: false,
});

module.exports = City;
