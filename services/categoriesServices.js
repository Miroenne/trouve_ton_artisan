const requestRepository = require('../repositories/categoriesRepository')
const buildError = require('../utils/errorFactory');

/**
 * Retrieve all artisan categories from the data layer.
 *
 * @returns {Promise<Array>} Category rows returned by the repository.
 * @throws {Error & {code: number}} Throws when no categories are available.
 */
exports.getAllCategory = async () => {

    const category = await requestRepository.getAll();
    if (category) {
        return category;
    } else {
        throw buildError('Categories not found', 404);
    }
    
};

/**
 * Retrieve one artisan category by id.
 *
 * @param {number} id - Category identifier.
 * @returns {Promise<object>} Category row returned by the repository.
 * @throws {Error & {code: number}} Throws when the category does not exist.
 */
exports.getCategoryById = async (id) => {
    const category = await requestRepository.getById(id);

    if (!category) {
        throw buildError('Category not found', 404);
    }

    return category;
};

/**
 * Create one artisan category.
 *
 * @param {object} payload - Category data.
 * @returns {Promise<object>} Created category.
 * @throws {Error & {code: number}} Throws when the required name is missing.
 */
exports.createCategory = async (payload) => {
    if (!payload.nom_Catégorie && !payload.name) {
        throw buildError('Category name is required', 400);
    }

    return requestRepository.create(payload);
};

/**
 * Update one artisan category.
 *
 * @param {number} id - Category identifier.
 * @param {object} payload - Category data.
 * @returns {Promise<object>} Updated category.
 * @throws {Error & {code: number}} Throws when the category does not exist.
 */
exports.updateCategory = async (id, payload) => {
    const category = await requestRepository.update(id, payload);

    if (!category) {
        throw buildError('Category not found', 404);
    }

    return category;
};

/**
 * Delete one artisan category.
 *
 * @param {number} id - Category identifier.
 * @returns {Promise<void>} Resolves when the category is deleted.
 * @throws {Error & {code: number}} Throws when the category does not exist.
 */
exports.deleteCategory = async (id) => {
    const isDeleted = await requestRepository.remove(id);

    if (!isDeleted) {
        throw buildError('Category not found', 404);
    }
};
