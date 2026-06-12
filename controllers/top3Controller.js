const top3Services = require('../services/top3Services')

/**
 * Handle the HTTP request that returns the featured top three artisans.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the featured artisans or an error payload.
 */
exports.getTop3Controller = async (req, res) => {

    try {
        const top3 = await top3Services.getTop3();
        res.status(200).json(top3);
    } catch (error) {
        res.status(400).json({
            message: 'Erreur lors de la récupération des artisans du mois',
            code: error.code,
            errorMessage: error.message
        });
    }
    
};
