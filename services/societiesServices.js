const requestRepository = require('../repositories/request')
const buildError = require('../utils/errorFactory');

exports.getSocietiesByCategory = async (category) => {

    const societies = await requestRepository.categorySearch(category);
    if (societies) {
        return societies;
    } else {
        throw buildError('Category not found', 404);
    }

};

exports.getSocietiesByName = async (name) => {

    const society = await requestRepository.nameSearch(name);
    if (society) {
        return society;
    } else {
        throw buildError(`Society not found`, 404);
    }

};