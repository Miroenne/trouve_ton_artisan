const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Specialty = sequelize.define('Specialty', {
    id_Spécialité: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_Spécialité: {
        type: DataTypes.STRING(45),
        unique: true,
    },
    Catégories_id_Catégorie: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Spécialités',
    timestamps: false,
});

module.exports = Specialty;
