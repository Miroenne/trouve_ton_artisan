const societiesRepository = require('../repositories/societiesRepository')
const buildError = require('../utils/errorFactory');

/**
 * Retrieve societies that belong to a category.
 *
 * @param {string} category - Category name or partial category name.
 * @returns {Promise<Array>} Society rows matching the category.
 * @throws {Error & {code: number}} Throws when the category has no matching societies.
 */
exports.getSocietiesByCategory = async (category) => {

    const societies = await societiesRepository.getSocietiesByCategory(category);
    if (societies) {
        return societies;
    } else {
        throw buildError('Category not found', 404);
    }

};

/**
 * Retrieve societies that match a normalized name.
 *
 * @param {string} value - Society name or partial society name.
 * @returns {Promise<Array>} Society rows matching the provided name.
 * @throws {Error & {code: number}} Throws when no society matches the provided name.
 */
exports.getSocietyByName = async (value) => {

    const name = value.trim().toLowerCase();

    const society = await societiesRepository.getSocietyByName(name);
    if (society) {
        return society;
    } else {
        throw buildError(`Society not found`, 404);
    }

};
