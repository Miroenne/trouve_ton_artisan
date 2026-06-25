const top3Repository = require('../repositories/top3Repository')
const buildError = require('../utils/errorFactory');

/**
 * Retrieve the featured top three artisans from the data layer.
 *
 * @returns {Promise<Array>} Featured artisans returned by the repository.
 * @throws {Error & {code: number}} Throws when no top three data is available.
 */
exports.getTop3 = async () => {

    const top_3 = await top3Repository.get();
    if (top_3) {
        return top_3;
    } else {
        throw buildError('Top 3 not found', 404);
    }
    
};
