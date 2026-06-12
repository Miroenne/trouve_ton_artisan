const requestRepository = require('../repositories/categoriresRepository')
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
