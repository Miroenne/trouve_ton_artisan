const categoriesServices = require('../services/categoriesServices')

/**
 * Handle the HTTP request that returns all available categories.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with categories or an error payload.
 */
exports.getAllCategoriesController = async (req, res) => {

    try {
        const categories = await categoriesServices.getAllCategory();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération des catégories",
            code: error.code,
            errorMessage: error.message,
        });
    }
}
