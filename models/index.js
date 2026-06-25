const sequelize = require('../db/sequelize');
const Category = require('./Category');
const City = require('./City');
const Specialty = require('./Specialty');
const Top = require('./Top');
const Artisan = require('./Artisan');

Category.hasMany(Specialty, {
    foreignKey: 'Catégories_id_Catégorie',
    as: 'specialties',
});

Specialty.belongsTo(Category, {
    foreignKey: 'Catégories_id_Catégorie',
    as: 'category',
});

Specialty.hasMany(Artisan, {
    foreignKey: 'Spécialités_id_Spécialité',
    as: 'artisans',
});

Artisan.belongsTo(Specialty, {
    foreignKey: 'Spécialités_id_Spécialité',
    as: 'specialty',
});

City.hasMany(Artisan, {
    foreignKey: 'Villes_id_Ville',
    as: 'artisans',
});

Artisan.belongsTo(City, {
    foreignKey: 'Villes_id_Ville',
    as: 'city',
});

Top.hasMany(Artisan, {
    foreignKey: 'Top_id_Top',
    as: 'artisans',
});

Artisan.belongsTo(Top, {
    foreignKey: 'Top_id_Top',
    as: 'top',
});

module.exports = {
    sequelize,
    Category,
    City,
    Specialty,
    Top,
    Artisan,
};
