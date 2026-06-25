const societiesRepository = require('../repositories/societiesRepository')
const buildError = require('../utils/errorFactory');

/**
 * Retrieve all societies.
 *
 * @returns {Promise<Array>} Society rows returned by the repository.
 */
exports.getAllSocieties = async () => societiesRepository.getAll();

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

/**
 * Retrieve one society by id.
 *
 * @param {number} id - Artisan identifier.
 * @returns {Promise<object>} Society row returned by the repository.
 * @throws {Error & {code: number}} Throws when no society matches the id.
 */
exports.getSocietyById = async (id) => {
    const society = await societiesRepository.getById(id);

    if (!society) {
        throw buildError('Society not found', 404);
    }

    return society;
};

/**
 * Create one society.
 *
 * @param {object} payload - Artisan data.
 * @returns {Promise<object>} Created society.
 * @throws {Error & {code: number}} Throws when required fields are missing.
 */
exports.createSociety = async (payload) => {
    if (!payload.nom || !payload.email || payload.note === undefined) {
        throw buildError('Society name, email and note are required', 400);
    }

    return societiesRepository.create(payload);
};

/**
 * Update one society.
 *
 * @param {number} id - Artisan identifier.
 * @param {object} payload - Artisan data.
 * @returns {Promise<object>} Updated society.
 * @throws {Error & {code: number}} Throws when no society matches the id.
 */
exports.updateSociety = async (id, payload) => {
    const society = await societiesRepository.update(id, payload);

    if (!society) {
        throw buildError('Society not found', 404);
    }

    return society;
};

/**
 * Delete one society.
 *
 * @param {number} id - Artisan identifier.
 * @returns {Promise<void>} Resolves when the society is deleted.
 * @throws {Error & {code: number}} Throws when no society matches the id.
 */
exports.deleteSociety = async (id) => {
    const isDeleted = await societiesRepository.remove(id);

    if (!isDeleted) {
        throw buildError('Society not found', 404);
    }
};
