const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Artisan = sequelize.define('Artisan', {
    id_Artisan: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    site_web: {
        type: DataTypes.STRING(45),
        unique: true,
    },
    a_propos: {
        type: DataTypes.STRING(255),
    },
    photo_url: {
        type: DataTypes.STRING(255),
        unique: true,
    },
    note: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
    },
    Spécialités_id_Spécialité: {
        type: DataTypes.INTEGER,
    },
    Villes_id_Ville: {
        type: DataTypes.INTEGER,
    },
    Top_id_Top: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Artisans',
    timestamps: false,
});

module.exports = Artisan;
