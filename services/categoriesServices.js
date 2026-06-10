const requestRepository = require('../repositories/categoriresRepository')
const buildError = require('../utils/errorFactory');

exports.getAllCategory = async () => {

    const category = await requestRepository.getAll();
    if (category) {
        return category;
    } else {
        throw buildError('Categories not found', 404);
    }
    
};