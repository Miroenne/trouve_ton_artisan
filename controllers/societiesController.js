const societiesServices = require('../services/societiesServices');

exports.getSocietiesByCategory = async (req, res) => {

    const category = req.params.category;

    try {
        const societies = await societiesServices.getSocietiesByCategory(category);
        res.status(200).json(societies);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération des sociétés de la catégorie : " + category,
            code: error.code,
            errorMessage: error.message,
        });
    }
}

exports.getSocietyByName = async (req, res) => {

    const societyName = req.params.societyName;

    try {
        const society = await societiesServices.getSocietiesByName(societyName);
        res.status(200).json(society)
    } catch {
        res.status(400).json({
            message: "Erreur lors de la récupération de la société : " + societyName,
            code: error.code,
            errorMessage: error.message,
        });
    }

}