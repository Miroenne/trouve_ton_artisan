const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Top = sequelize.define('Top', {
    id_Top: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    top_Value: {
        type: DataTypes.STRING(45),
        unique: true,
    },
}, {
    tableName: 'Top',
    timestamps: false,
});

module.exports = Top;
