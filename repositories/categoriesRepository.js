const { Category } = require('../models');

/**
 * Select all category names from the application database.
 *
 * @returns {Promise<Array>} Category rows returned by Sequelize.
 */
exports.getAll = async () => Category.findAll({
    attributes: ['id_Catégorie', 'nom_Catégorie'],
    order: [['nom_Catégorie', 'ASC']],
    raw: true,
});

/**
 * Select one category by primary key.
 *
 * @param {number} id - Category identifier.
 * @returns {Promise<object|null>} Matching category or null.
 */
exports.getById = async (id) => Category.findByPk(id, { raw: true });

/**
 * Create one category.
 *
 * @param {object} payload - Category data.
 * @param {string} payload.nom_Catégorie - Category name.
 * @returns {Promise<object>} Created category.
 */
exports.create = async (payload) => Category.create({
    nom_Catégorie: payload.nom_Catégorie || payload.name,
});

/**
 * Update one category.
 *
 * @param {number} id - Category identifier.
 * @param {object} payload - Category data.
 * @returns {Promise<object|null>} Updated category or null.
 */
exports.update = async (id, payload) => {
    const category = await Category.findByPk(id);

    if (!category) {
        return null;
    }

    await category.update({
        nom_Catégorie: payload.nom_Catégorie || payload.name || category.nom_Catégorie,
    });

    return category.get({ plain: true });
};

/**
 * Delete one category.
 *
 * @param {number} id - Category identifier.
 * @returns {Promise<boolean>} True when a row was deleted.
 */
exports.remove = async (id) => {
    const deletedRows = await Category.destroy({
        where: { id_Catégorie: id },
    });

    return deletedRows > 0;
};
