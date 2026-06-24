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

/**
 * Handle the HTTP request that returns one category by id.
 *
 * @param {import('express').Request} req - Express request object containing `id` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the category or an error payload.
 */
exports.getCategoryByIdController = async (req, res) => {
    try {
        const category = await categoriesServices.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la récupération de la catégorie",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that creates one category.
 *
 * @param {import('express').Request} req - Express request object containing category data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the created category or an error payload.
 */
exports.createCategoryController = async (req, res) => {
    try {
        const category = await categoriesServices.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la création de la catégorie",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that updates one category.
 *
 * @param {import('express').Request} req - Express request object containing `id` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the updated category or an error payload.
 */
exports.updateCategoryController = async (req, res) => {
    try {
        const category = await categoriesServices.updateCategory(req.params.id, req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la mise à jour de la catégorie",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that deletes one category.
 *
 * @param {import('express').Request} req - Express request object containing `id` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends an empty response or an error payload.
 */
exports.deleteCategoryController = async (req, res) => {
    try {
        await categoriesServices.deleteCategory(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la suppression de la catégorie",
            code: error.code,
            errorMessage: error.message,
        });
    }
};
