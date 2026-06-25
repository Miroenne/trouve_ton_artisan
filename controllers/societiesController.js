const societiesServices = require('../services/societiesServices');

/**
 * Handle the HTTP request that returns all societies.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with societies or an error payload.
 */
exports.getAllSocieties = async (req, res) => {
    try {
        const societies = await societiesServices.getAllSocieties();
        res.status(200).json(societies);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la récupération des sociétés",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that returns societies for a category.
 *
 * @param {import('express').Request} req - Express request object containing `category` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with matching societies or an error payload.
 */
exports.getSocietiesByCategory = async (req, res) => {

    const category = req.params.category;
    try {
        const societies = await societiesServices.getSocietiesByCategory(category);
        res.status(200).json(societies);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la récupération des sociétés de la catégorie : " + category,
            code: error.code,
            errorMessage: error.message,
        });
    }
}

/**
 * Handle the HTTP request that returns societies matching a name.
 *
 * @param {import('express').Request} req - Express request object containing `nom` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with matching societies or an error payload.
 */
exports.getSocietyByName = async (req, res) => {

    const societyName = req.params.nom;

    try {
        const society = await societiesServices.getSocietyByName(societyName);
        res.status(200).json(society)
    } catch (error){
        res.status(error.code || 400).json({
            message: "Erreur lors de la récupération de la société : " + societyName,
            code: error.code,
            errorMessage: error.message,
        });
    }

}

/**
 * Handle the HTTP request that returns one society by id.
 *
 * @param {import('express').Request} req - Express request object containing `id` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the society or an error payload.
 */
exports.getSocietyById = async (req, res) => {
    try {
        const society = await societiesServices.getSocietyById(req.params.id);
        res.status(200).json(society);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la récupération de la société",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that creates one society.
 *
 * @param {import('express').Request} req - Express request object containing society data in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the created society or an error payload.
 */
exports.createSociety = async (req, res) => {
    try {
        const society = await societiesServices.createSociety(req.body);
        res.status(201).json(society);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la création de la société",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that updates one society.
 *
 * @param {import('express').Request} req - Express request object containing `id` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the updated society or an error payload.
 */
exports.updateSociety = async (req, res) => {
    try {
        const society = await societiesServices.updateSociety(req.params.id, req.body);
        res.status(200).json(society);
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la mise à jour de la société",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Handle the HTTP request that deletes one society.
 *
 * @param {import('express').Request} req - Express request object containing `id` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends an empty response or an error payload.
 */
exports.deleteSociety = async (req, res) => {
    try {
        await societiesServices.deleteSociety(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(error.code || 400).json({
            message: "Erreur lors de la suppression de la société",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Return a simple health-check style response for manual route testing.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void} Sends a test confirmation response.
 */
exports.test = (req, res) => {
    res.status(200).json("test ok")
}
