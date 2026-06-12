const societiesServices = require('../services/societiesServices');

/**
 * Handle the HTTP request that returns societies for a category.
 *
 * @param {import('express').Request} req - Express request object containing `category` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with matching societies or an error payload.
 */
exports.getSocietiesByCategory = async (req, res) => {

    const category = req.params.category;
    console.log("Entrée dans le contrôleur")
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

/**
 * Handle the HTTP request that returns societies matching a name.
 *
 * @param {import('express').Request} req - Express request object containing `nom` in route params.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with matching societies or an error payload.
 */
exports.getSocietyByName = async (req, res) => {

    const societyName = req.params.nom;

    console.log(societyName)

    try {
        const society = await societiesServices.getSocietyByName(societyName);
        res.status(200).json(society)
    } catch (error){
        res.status(400).json({
            message: "Erreur lors de la récupération de la société : " + societyName,
            code: error.code,
            errorMessage: error.message,
        });
    }

}

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
