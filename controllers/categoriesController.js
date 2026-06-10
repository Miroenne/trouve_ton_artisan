const categoriesServices = require('../services/categoriesServices')

exports.getAllCategoriesController = async (req, res) => {

    try {
        const categories = await categoriesServices.getAllCategory();
        res.satus(200).json(categories);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération des catégories",
            code: error.code,
            errorMessage: error.message,
        });
    }
}