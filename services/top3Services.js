const top3Repository = require('../repositories/top3Repository')
const buildError = require('../utils/errorFactory');

exports.getTop3 = async () => {

    const top_3 = await requestRepository.get();
    if (top_3) {
        return top_3;
    } else {
        throw buildError('Top 3 not found', 404);
    }
    
};